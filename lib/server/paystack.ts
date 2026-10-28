import 'server-only';

import { createHmac, timingSafeEqual } from 'crypto';

import { getPaystackConfig } from '@/lib/server/config';

const PAYSTACK_API_URL = 'https://api.paystack.co';
const REQUEST_TIMEOUT_MS = 15_000;

type PaystackEnvelope<T> = {
  status: boolean;
  message: string;
  data: T;
};

type PaystackInitializeData = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

export type PaystackTransaction = {
  id: number;
  status: string;
  reference: string;
  amount: number;
  currency: string;
  channel?: string | null;
  paid_at?: string | null;
  metadata?: unknown;
  customer?: {
    email?: string;
  } | null;
};

export type InitializeTransactionInput = {
  email: string;
  amountInPesewas: number;
  currency: 'GHS';
  reference: string;
  callbackUrl: string;
  metadata: Record<string, unknown>;
};

export class PaystackError extends Error {
  constructor(message = 'Paystack request failed') {
    super(message);
    this.name = 'PaystackError';
  }
}

async function paystackRequest<T>(path: string, init: RequestInit): Promise<T> {
  const { secretKey } = getPaystackConfig();

  let response: Response;
  try {
    response = await fetch(`${PAYSTACK_API_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${secretKey}`,
        Accept: 'application/json',
        ...init.headers,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    throw new PaystackError('Unable to connect to the payment provider');
  }

  let payload: PaystackEnvelope<T> | undefined;
  try {
    payload = await response.json() as PaystackEnvelope<T>;
  } catch {
    throw new PaystackError('Payment provider returned an invalid response');
  }

  if (!response.ok || payload.status !== true || !payload.data) {
    // The provider message is deliberately not forwarded to the browser by route handlers.
    throw new PaystackError(payload.message || 'Payment provider rejected the request');
  }
  return payload.data;
}

export async function initializeTransaction(input: InitializeTransactionInput) {
  const data = await paystackRequest<PaystackInitializeData>('/transaction/initialize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: input.email,
      amount: String(input.amountInPesewas),
      currency: input.currency,
      reference: input.reference,
      callback_url: input.callbackUrl,
      // Paystack documents metadata as a JSON string on the Transaction API.
      metadata: JSON.stringify(input.metadata),
    }),
  });

  const authorizationUrl = new URL(data.authorization_url);
  const isPaystackHost = authorizationUrl.hostname === 'paystack.com'
    || authorizationUrl.hostname.endsWith('.paystack.com');
  if (authorizationUrl.protocol !== 'https:' || !isPaystackHost) {
    throw new PaystackError('Payment provider returned an unsafe checkout URL');
  }
  if (data.reference !== input.reference) {
    throw new PaystackError('Payment provider returned a mismatched reference');
  }

  return { authorizationUrl: authorizationUrl.toString(), reference: data.reference };
}

export function isEditingPaymentReference(reference: string): boolean {
  return /^EDIT-[0-9]{10,16}-[A-F0-9]{12}$/.test(reference);
}

export async function verifyTransaction(reference: string): Promise<PaystackTransaction> {
  if (!isEditingPaymentReference(reference)) {
    throw new PaystackError('Invalid editing payment reference');
  }

  return paystackRequest<PaystackTransaction>(
    `/transaction/verify/${encodeURIComponent(reference)}`,
    { method: 'GET' },
  );
}

export function verifyWebhookSignature(rawBody: string, suppliedSignature: string | null): boolean {
  if (!suppliedSignature || !/^[a-f0-9]{128}$/i.test(suppliedSignature)) return false;

  const { secretKey } = getPaystackConfig();
  const expectedSignature = createHmac('sha512', secretKey).update(rawBody, 'utf8').digest('hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const suppliedBuffer = Buffer.from(suppliedSignature, 'hex');

  return expectedBuffer.length === suppliedBuffer.length
    && timingSafeEqual(expectedBuffer, suppliedBuffer);
}
