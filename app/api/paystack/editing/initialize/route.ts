import { randomBytes } from 'crypto';

import { getPaystackConfig } from '@/lib/server/config';
import {
  calculateEditingAmount,
  createEditingMetadata,
  parseEditingCheckoutInput,
} from '@/lib/server/editingOrder';
import {
  assertSameOrigin,
  getClientAddress,
  jsonResponse,
  publicErrorResponse,
  readJsonBody,
} from '@/lib/server/http';
import { initializeTransaction } from '@/lib/server/paystack';
import { checkRateLimit } from '@/lib/server/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function createReference(): string {
  return `EDIT-${Date.now()}-${randomBytes(6).toString('hex').toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);

    const clientAddress = getClientAddress(request);
    const limit = checkRateLimit(`editing-initialize:${clientAddress}`, 10, 10 * 60 * 1_000);
    if (!limit.allowed) {
      return jsonResponse(
        { error: 'Too many payment attempts. Please wait and try again.' },
        429,
        { 'Retry-After': String(limit.retryAfterSeconds) },
      );
    }

    const input = parseEditingCheckoutInput(await readJsonBody(request));
    const { amountInPesewas } = calculateEditingAmount(input.serviceId, input.photoCount);
    const { appUrl } = getPaystackConfig();
    const reference = createReference();

    const callbackUrl = new URL('/service-checkout', appUrl);
    callbackUrl.searchParams.set('payment', 'callback');
    const cancelUrl = new URL('/service-checkout', appUrl);
    cancelUrl.searchParams.set('payment', 'cancelled');

    // Amount, currency, reference, and metadata are all created on the server.
    const payment = await initializeTransaction({
      email: input.customer.email,
      amountInPesewas,
      currency: 'GHS',
      reference,
      callbackUrl: callbackUrl.toString(),
      metadata: createEditingMetadata(input, cancelUrl.toString()),
    });

    return jsonResponse({ authorizationUrl: payment.authorizationUrl });
  } catch (error) {
    return publicErrorResponse(error, 'Unable to start payment. Please try again.');
  }
}
