import 'server-only';

import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';

import { getEditingService } from '@/lib/editingServices';
import { getPaystackConfig } from '@/lib/server/config';
import { PaystackError, type PaystackTransaction } from '@/lib/server/paystack';
import { RequestError } from '@/lib/server/http';
import {
  readEmail,
  readInteger,
  readPhone,
  readString,
  requireRecord,
  isRecord,
} from '@/lib/server/validation';

const EDITING_METADATA_VERSION = 'editing-v1';
const MAXIMUM_PHOTO_COUNT = 1_000;

export type EditingCheckoutInput = {
  serviceId: string;
  photoCount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  instructions: string;
};

export type VerifiedEditingOrder = {
  reference: string;
  status: 'success';
  serviceId: string;
  serviceTitle: string;
  turnaroundTime: string;
  photoCount: number;
  unitPrice: number;
  total: number;
  amountInPesewas: number;
  currency: 'GHS';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  instructions: string;
  paymentChannel: string | null;
  paidAt: string | null;
  transactionId: number;
};

type EditingMetadata = {
  version: typeof EDITING_METADATA_VERSION;
  serviceId: string;
  photoCount: number;
  order: string;
  cancel_action?: string;
};

export function parseEditingCheckoutInput(value: unknown): EditingCheckoutInput {
  const body = requireRecord(value);
  const serviceId = readString(body, 'serviceId', 'Editing service', { maximum: 50 });
  if (!getEditingService(serviceId)) throw new RequestError('Selected editing service is unavailable');

  return {
    serviceId,
    photoCount: readInteger(body, 'photoCount', 'Photo count', 1, MAXIMUM_PHOTO_COUNT),
    customer: {
      name: readString(body, 'name', 'Full name', { minimum: 2, maximum: 100 }),
      email: readEmail(body),
      phone: readPhone(body),
    },
    instructions: readString(body, 'instructions', 'Editing instructions', {
      minimum: 5,
      maximum: 1_000,
      multiline: true,
    }),
  };
}

export function calculateEditingAmount(serviceId: string, photoCount: number) {
  const service = getEditingService(serviceId);
  if (!service) throw new RequestError('Selected editing service is unavailable');
  if (!Number.isInteger(photoCount) || photoCount < 1 || photoCount > MAXIMUM_PHOTO_COUNT) {
    throw new RequestError('Photo count is invalid');
  }

  const total = service.price * photoCount;
  const amountInPesewas = Math.round(total * 100);
  if (!Number.isSafeInteger(amountInPesewas) || amountInPesewas < 100) {
    throw new RequestError('Calculated payment amount is invalid');
  }

  return { service, total, amountInPesewas };
}

function getMetadataEncryptionKey(): Buffer {
  const { secretKey } = getPaystackConfig();
  return createHash('sha256')
    .update(`mkaygraphics:${EDITING_METADATA_VERSION}:${secretKey}`, 'utf8')
    .digest();
}

/**
 * Customer contact details and instructions are encrypted before being attached
 * to Paystack metadata. The server can recover them after a verified transaction,
 * while the browser never receives the encrypted payload or encryption key.
 */
function encryptOrderDetails(input: EditingCheckoutInput): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', getMetadataEncryptionKey(), iv);
  const plaintext = JSON.stringify({
    name: input.customer.name,
    email: input.customer.email,
    phone: input.customer.phone,
    instructions: input.instructions,
  });
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authenticationTag = cipher.getAuthTag();
  return Buffer.concat([iv, authenticationTag, ciphertext]).toString('base64url');
}

function decryptOrderDetails(payload: string): EditingCheckoutInput['customer'] & { instructions: string } {
  try {
    const packed = Buffer.from(payload, 'base64url');
    if (packed.length < 29 || packed.length > 4_096) throw new Error('Invalid encrypted payload length');

    const iv = packed.subarray(0, 12);
    const authenticationTag = packed.subarray(12, 28);
    const ciphertext = packed.subarray(28);
    const decipher = createDecipheriv('aes-256-gcm', getMetadataEncryptionKey(), iv);
    decipher.setAuthTag(authenticationTag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
    const decoded = requireRecord(JSON.parse(plaintext) as unknown);

    return {
      name: readString(decoded, 'name', 'Customer name', { minimum: 2, maximum: 100 }),
      email: readEmail(decoded),
      phone: readPhone(decoded),
      instructions: readString(decoded, 'instructions', 'Editing instructions', {
        minimum: 5,
        maximum: 1_000,
        multiline: true,
      }),
    };
  } catch {
    throw new PaystackError('Editing order metadata could not be authenticated');
  }
}

export function createEditingMetadata(
  input: EditingCheckoutInput,
  cancelAction: string,
): EditingMetadata {
  return {
    version: EDITING_METADATA_VERSION,
    serviceId: input.serviceId,
    photoCount: input.photoCount,
    order: encryptOrderDetails(input),
    cancel_action: cancelAction,
  };
}

function parseMetadata(metadata: unknown): EditingMetadata {
  let parsed = metadata;
  if (typeof metadata === 'string') {
    try {
      parsed = JSON.parse(metadata) as unknown;
    } catch {
      throw new PaystackError('Payment metadata is invalid');
    }
  }
  if (!isRecord(parsed)) throw new PaystackError('Payment metadata is missing');

  const version = parsed.version;
  const serviceId = parsed.serviceId;
  const photoCount = parsed.photoCount;
  const order = parsed.order;
  if (
    version !== EDITING_METADATA_VERSION
    || typeof serviceId !== 'string'
    || typeof photoCount !== 'number'
    || typeof order !== 'string'
  ) {
    throw new PaystackError('Payment metadata does not describe an editing order');
  }

  return {
    version,
    serviceId,
    photoCount,
    order,
    cancel_action: typeof parsed.cancel_action === 'string' ? parsed.cancel_action : undefined,
  };
}

export function resolveVerifiedEditingOrder(transaction: PaystackTransaction): VerifiedEditingOrder {
  if (transaction.status !== 'success') {
    throw new RequestError('Payment is not successful yet', 409);
  }
  if (transaction.currency !== 'GHS') {
    throw new PaystackError('Payment currency does not match the editing order');
  }

  const metadata = parseMetadata(transaction.metadata);
  const details = decryptOrderDetails(metadata.order);
  const { service, total, amountInPesewas } = calculateEditingAmount(
    metadata.serviceId,
    metadata.photoCount,
  );

  // The amount is always reconstructed from the server catalog, never from browser values.
  if (transaction.amount !== amountInPesewas) {
    throw new PaystackError('Paid amount does not match the server-calculated order amount');
  }
  if (transaction.customer?.email?.toLowerCase() !== details.email.toLowerCase()) {
    throw new PaystackError('Payment customer does not match the editing order');
  }

  return {
    reference: transaction.reference,
    status: 'success',
    serviceId: service.id,
    serviceTitle: service.title,
    turnaroundTime: service.turnaroundTime,
    photoCount: metadata.photoCount,
    unitPrice: service.price,
    total,
    amountInPesewas,
    currency: 'GHS',
    customerName: details.name,
    customerEmail: details.email,
    customerPhone: details.phone,
    instructions: details.instructions,
    paymentChannel: transaction.channel ?? null,
    paidAt: transaction.paid_at ?? null,
    transactionId: transaction.id,
  };
}
