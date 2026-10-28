import 'server-only';

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  email: string;
  password: string;
  receiver: string;
  fromName: string;
};

type PaystackConfig = {
  secretKey: string;
  appUrl: URL;
};

let cachedMailConfig: MailConfig | undefined;
let cachedPaystackConfig: PaystackConfig | undefined;
let cachedAppUrl: URL | undefined;

function requireEnvironmentValue(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }
  return value;
}

function assertEmail(value: string, variableName: string): string {
  if (value.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error(`${variableName} must contain a valid email address`);
  }
  return value;
}

function parseBoolean(value: string, variableName: string): boolean {
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`${variableName} must be either true or false`);
}

export function getAppUrl(): URL {
  if (cachedAppUrl) return cachedAppUrl;
  const appUrl = new URL(requireEnvironmentValue('APP_URL'));
  const isLocalAddress = ['localhost', '127.0.0.1'].includes(appUrl.hostname);
  if (appUrl.protocol !== 'https:' && !(isLocalAddress && appUrl.protocol === 'http:')) {
    throw new Error('APP_URL must use HTTPS outside local development');
  }
  cachedAppUrl = appUrl;
  return cachedAppUrl;
}

export function getPaystackConfig(): PaystackConfig {
  if (cachedPaystackConfig) return cachedPaystackConfig;

  const secretKey = requireEnvironmentValue('PAYSTACK_SECRET_KEY');
  if (!secretKey.startsWith('sk_')) {
    throw new Error('PAYSTACK_SECRET_KEY does not look like a Paystack server key');
  }

  cachedPaystackConfig = { secretKey, appUrl: getAppUrl() };
  return cachedPaystackConfig;
}

export function getMailConfig(): MailConfig {
  if (cachedMailConfig) return cachedMailConfig;

  const port = Number(requireEnvironmentValue('NODEMAILER_PORT'));
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('NODEMAILER_PORT must be a valid TCP port');
  }

  cachedMailConfig = {
    host: requireEnvironmentValue('NODEMAILER_HOST'),
    port,
    secure: parseBoolean(requireEnvironmentValue('NODEMAILER_SECURE'), 'NODEMAILER_SECURE'),
    email: assertEmail(requireEnvironmentValue('NODEMAILER_EMAIL'), 'NODEMAILER_EMAIL'),
    password: requireEnvironmentValue('NODEMAILER_PASSWORD'),
    receiver: assertEmail(requireEnvironmentValue('NODEMAILER_RECEIVER'), 'NODEMAILER_RECEIVER'),
    fromName: requireEnvironmentValue('NODEMAILER_FROM_NAME').slice(0, 100),
  };

  return cachedMailConfig;
}
