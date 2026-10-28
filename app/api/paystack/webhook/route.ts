import { dispatchEditingOrderEmails } from '@/lib/server/mailer';
import { resolveVerifiedEditingOrder } from '@/lib/server/editingOrder';
import { jsonResponse } from '@/lib/server/http';
import {
  isEditingPaymentReference,
  verifyTransaction,
  verifyWebhookSignature,
} from '@/lib/server/paystack';
import { isRecord } from '@/lib/server/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAXIMUM_WEBHOOK_BYTES = 256 * 1_024;

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAXIMUM_WEBHOOK_BYTES) {
    return jsonResponse({ error: 'Webhook payload is too large' }, 413);
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, 'utf8') > MAXIMUM_WEBHOOK_BYTES) {
    return jsonResponse({ error: 'Webhook payload is too large' }, 413);
  }

  // Signature validation must use the untouched raw request body.
  if (!verifyWebhookSignature(rawBody, request.headers.get('x-paystack-signature'))) {
    return jsonResponse({ error: 'Invalid webhook signature' }, 401);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return jsonResponse({ error: 'Invalid webhook JSON' }, 400);
  }

  if (!isRecord(payload) || payload.event !== 'charge.success' || !isRecord(payload.data)) {
    return jsonResponse({ received: true, ignored: true });
  }

  const reference = payload.data.reference;
  if (typeof reference !== 'string' || !isEditingPaymentReference(reference)) {
    return jsonResponse({ received: true, ignored: true });
  }

  try {
    // Do not trust the event body alone. Re-fetch the transaction from Paystack,
    // then re-check its status, currency, amount, customer, and encrypted metadata.
    const transaction = await verifyTransaction(reference);
    if (transaction.reference !== reference) throw new Error('Webhook reference mismatch');
    const order = resolveVerifiedEditingOrder(transaction);
    await dispatchEditingOrderEmails(order);
    return jsonResponse({ received: true });
  } catch (error) {
    // A non-2xx response lets Paystack retry a temporary SMTP or provider failure.
    console.error(
      'Unable to process editing payment webhook',
      error instanceof Error ? error.message : 'Unknown webhook error',
    );
    return jsonResponse({ error: 'Webhook processing failed' }, 500);
  }
}
