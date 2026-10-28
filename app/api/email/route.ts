import type { ContactMessage } from '@/lib/server/emailTemplates';
import {
  assertSameOrigin,
  getClientAddress,
  jsonResponse,
  publicErrorResponse,
  readJsonBody,
  RequestError,
} from '@/lib/server/http';
import { sendContactEmails } from '@/lib/server/mailer';
import { checkRateLimit } from '@/lib/server/rateLimit';
import {
  readEmail,
  readPhone,
  readString,
  requireRecord,
} from '@/lib/server/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_SERVICES = new Set([
  'Custom Framing',
  'Photo Editing',
  'Printing Services',
  'Photobooks',
  'Graphic Design',
  'Photography (Coming Soon)',
  'Brand Identity',
  'General Inquiry',
  'Other',
]);

function parseContactMessage(value: unknown): ContactMessage & { website: string } {
  const body = requireRecord(value);
  const service = readString(body, 'service', 'Service', { maximum: 80, optional: true });
  if (service && !ALLOWED_SERVICES.has(service)) {
    throw new RequestError('Selected service is invalid');
  }

  return {
    name: readString(body, 'name', 'Name', { minimum: 2, maximum: 100 }),
    email: readEmail(body),
    phone: readPhone(body),
    service: service || 'General Inquiry',
    company: readString(body, 'company', 'Company', { maximum: 120, optional: true }),
    timeline: readString(body, 'timeline', 'Timeline', { maximum: 100, optional: true }),
    message: readString(body, 'message', 'Message', {
      minimum: 5,
      maximum: 2_000,
      multiline: true,
    }),
    website: readString(body, 'website', 'Website', { maximum: 200, optional: true }),
  };
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);

    const clientAddress = getClientAddress(request);
    const limit = checkRateLimit(`contact:${clientAddress}`, 5, 15 * 60 * 1_000);
    if (!limit.allowed) {
      return jsonResponse(
        { error: 'Too many messages. Please wait before trying again.' },
        429,
        { 'Retry-After': String(limit.retryAfterSeconds) },
      );
    }

    const { website, ...message } = parseContactMessage(await readJsonBody(request));
    // Hidden honeypot fields are completed by bots, not normal users.
    if (website) return jsonResponse({ success: true });

    await sendContactEmails(message);
    return jsonResponse({ success: true });
  } catch (error) {
    return publicErrorResponse(error, 'Your message could not be sent. Please try again.');
  }
}
