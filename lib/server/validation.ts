import 'server-only';

import { RequestError } from '@/lib/server/http';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function requireRecord(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) throw new RequestError('Request body must be a JSON object');
  return value;
}

type StringOptions = {
  minimum?: number;
  maximum: number;
  optional?: boolean;
  multiline?: boolean;
};

export function readString(
  source: Record<string, unknown>,
  key: string,
  label: string,
  options: StringOptions,
): string {
  const rawValue = source[key];
  if (rawValue === undefined || rawValue === null || rawValue === '') {
    if (options.optional) return '';
    throw new RequestError(`${label} is required`);
  }
  if (typeof rawValue !== 'string') throw new RequestError(`${label} must be text`);

  // Remove control characters while preserving normal line breaks in message fields.
  const withoutControlCharacters = rawValue.replace(
    options.multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g,
    '',
  );
  const value = options.multiline
    ? withoutControlCharacters.trim().replace(/\r\n?/g, '\n')
    : withoutControlCharacters.trim().replace(/\s+/g, ' ');

  if (!value && options.optional) return '';
  if (value.length < (options.minimum ?? 1)) {
    throw new RequestError(`${label} is too short`);
  }
  if (value.length > options.maximum) {
    throw new RequestError(`${label} is too long`);
  }
  return value;
}

export function readEmail(source: Record<string, unknown>, key = 'email'): string {
  const email = readString(source, key, 'Email address', { maximum: 254 }).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new RequestError('Enter a valid email address');
  }
  return email;
}

export function readPhone(source: Record<string, unknown>, key = 'phone'): string {
  const phone = readString(source, key, 'Phone number', { maximum: 30 });
  const compactPhone = phone.replace(/[\s().-]/g, '');
  if (!/^\+?\d{8,15}$/.test(compactPhone)) {
    throw new RequestError('Enter a valid phone number');
  }
  return compactPhone;
}

export function readInteger(
  source: Record<string, unknown>,
  key: string,
  label: string,
  minimum: number,
  maximum: number,
): number {
  const value = source[key];
  if (typeof value !== 'number' || !Number.isInteger(value) || value < minimum || value > maximum) {
    throw new RequestError(`${label} must be between ${minimum} and ${maximum}`);
  }
  return value;
}
