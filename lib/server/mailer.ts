import 'server-only';

import nodemailer, { type Transporter } from 'nodemailer';

import { getMailConfig } from '@/lib/server/config';
import type { VerifiedEditingOrder } from '@/lib/server/editingOrder';
import {
  buildContactAdminEmail,
  buildContactCustomerEmail,
  buildEditingAdminEmail,
  buildEditingCustomerEmail,
  type ContactMessage,
} from '@/lib/server/emailTemplates';

const globalMailer = globalThis as typeof globalThis & {
  mkaygraphicsTransporter?: Transporter;
  mkaygraphicsEditingEmailJobs?: Map<string, Promise<void>>;
  mkaygraphicsEditingEmailStates?: Map<string, {
    adminSent: boolean;
    customerSent: boolean;
    updatedAt: number;
  }>;
};

function getTransporter(): Transporter {
  if (globalMailer.mkaygraphicsTransporter) return globalMailer.mkaygraphicsTransporter;

  const config = getMailConfig();
  globalMailer.mkaygraphicsTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.email, pass: config.password },
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
  });
  return globalMailer.mkaygraphicsTransporter;
}

function buildMessageId(kind: string, reference: string, senderEmail: string): string {
  const domain = senderEmail.split('@')[1] || 'mkaygraphics.local';
  const safeReference = reference.replace(/[^a-z0-9.-]/gi, '-').toLowerCase();
  return `<${kind}.${safeReference}@${domain}>`;
}

async function sendEditingEmail(
  order: VerifiedEditingOrder,
  recipient: 'admin' | 'customer',
): Promise<void> {
  const config = getMailConfig();
  const transporter = getTransporter();
  const from = { name: config.fromName, address: config.email };

  if (recipient === 'admin') {
    const content = buildEditingAdminEmail(order);
    await transporter.sendMail({
      from,
      to: config.receiver,
      replyTo: order.customerEmail,
      messageId: buildMessageId('editing-admin', order.reference, config.email),
      ...content,
    });
    return;
  }

  const content = buildEditingCustomerEmail(order);
  await transporter.sendMail({
    from,
    to: order.customerEmail,
    replyTo: config.receiver,
    messageId: buildMessageId('editing-customer', order.reference, config.email),
    ...content,
  });
}

/**
 * Coalesces simultaneous callback/webhook work and remembers successful sends in
 * the current process. Durable exactly-once delivery requires a database or queue,
 * which is intentionally outside the current no-database scope.
 */
export async function dispatchEditingOrderEmails(order: VerifiedEditingOrder): Promise<void> {
  const jobs = globalMailer.mkaygraphicsEditingEmailJobs ?? new Map<string, Promise<void>>();
  const states = globalMailer.mkaygraphicsEditingEmailStates ?? new Map();
  globalMailer.mkaygraphicsEditingEmailJobs = jobs;
  globalMailer.mkaygraphicsEditingEmailStates = states;

  const now = Date.now();
  for (const [reference, state] of states) {
    if (state.updatedAt < now - 24 * 60 * 60 * 1_000) states.delete(reference);
  }
  const state = states.get(order.reference) ?? {
    adminSent: false,
    customerSent: false,
    updatedAt: now,
  };
  states.set(order.reference, state);
  if (state.adminSent && state.customerSent) return;

  const existingJob = jobs.get(order.reference);
  if (existingJob) return existingJob;

  const job = (async () => {
    const sends: Promise<void>[] = [];
    if (!state.adminSent) {
      sends.push(sendEditingEmail(order, 'admin').then(() => {
        state.adminSent = true;
        state.updatedAt = Date.now();
      }));
    }
    if (!state.customerSent) {
      sends.push(sendEditingEmail(order, 'customer').then(() => {
        state.customerSent = true;
        state.updatedAt = Date.now();
      }));
    }

    const results = await Promise.allSettled(sends);
    if (results.some((result) => result.status === 'rejected')) {
      throw new Error('One or more editing order emails could not be sent');
    }
  })().finally(() => {
    jobs.delete(order.reference);
  });
  jobs.set(order.reference, job);
  return job;
}

export async function sendContactEmails(message: ContactMessage): Promise<void> {
  const config = getMailConfig();
  const transporter = getTransporter();
  const adminEmail = buildContactAdminEmail(message);
  const customerEmail = buildContactCustomerEmail(message);
  const from = { name: config.fromName, address: config.email };

  await Promise.all([
    transporter.sendMail({
      from,
      to: config.receiver,
      replyTo: message.email,
      ...adminEmail,
    }),
    transporter.sendMail({
      from,
      to: message.email,
      replyTo: config.receiver,
      ...customerEmail,
    }),
  ]);
}
