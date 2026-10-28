import {
  getClientAddress,
  jsonResponse,
  publicErrorResponse,
  RequestError,
} from '@/lib/server/http';
import { resolveVerifiedEditingOrder } from '@/lib/server/editingOrder';
import { isEditingPaymentReference, verifyTransaction } from '@/lib/server/paystack';
import { checkRateLimit } from '@/lib/server/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const clientAddress = getClientAddress(request);
    const limit = checkRateLimit(`editing-verify:${clientAddress}`, 30, 10 * 60 * 1_000);
    if (!limit.allowed) {
      return jsonResponse(
        { error: 'Too many verification attempts. Please wait and try again.' },
        429,
        { 'Retry-After': String(limit.retryAfterSeconds) },
      );
    }

    const reference = new URL(request.url).searchParams.get('reference')?.trim() ?? '';
    if (!isEditingPaymentReference(reference)) {
      throw new RequestError('Payment reference is invalid');
    }

    const transaction = await verifyTransaction(reference);
    if (transaction.reference !== reference) throw new RequestError('Payment reference mismatch', 409);
    const order = resolveVerifiedEditingOrder(transaction);

    // Only the minimum confirmation data required by the UI is returned.
    return jsonResponse({
      order: {
        reference: order.reference,
        status: order.status,
        serviceTitle: order.serviceTitle,
        photoCount: order.photoCount,
        unitPrice: order.unitPrice,
        total: order.total,
        currency: order.currency,
        customerEmail: order.customerEmail,
        paymentChannel: order.paymentChannel,
        paidAt: order.paidAt,
      },
    });
  } catch (error) {
    return publicErrorResponse(error, 'We could not verify this payment yet.');
  }
}
