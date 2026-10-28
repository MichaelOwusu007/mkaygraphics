import 'server-only';

import type { VerifiedEditingOrder } from '@/lib/server/editingOrder';

export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  service: string;
  company: string;
  timeline: string;
  message: string;
};

export type EmailContent = {
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

function htmlLines(value: string): string {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string | null): string {
  if (!value) return 'Confirmed by Paystack';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Confirmed by Paystack'
    : new Intl.DateTimeFormat('en-GH', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;color:#71717a;font-size:13px;vertical-align:top;width:38%;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:#18181b;font-size:14px;font-weight:700;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

function emailShell(preheader: string, title: string, intro: string, body: string, footer: string): string {
  return `<!doctype html>
  <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;background:#f5f5f4;font-family:Arial,Helvetica,sans-serif;color:#18181b;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f4;padding:28px 12px;">
        <tr><td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(24,24,27,.08);">
            <tr><td style="background:#09090b;padding:24px 32px;">
              <div style="color:#fbbf24;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">MkayGraphics &amp; Photography</div>
              <div style="color:#a1a1aa;font-size:12px;margin-top:7px;">Shoot. Edit. Frame. Design.</div>
            </td></tr>
            <tr><td style="padding:34px 32px 14px;">
              <h1 style="margin:0;font-size:28px;line-height:1.2;color:#18181b;">${escapeHtml(title)}</h1>
              <p style="margin:14px 0 0;color:#52525b;font-size:15px;line-height:1.7;">${escapeHtml(intro)}</p>
            </td></tr>
            <tr><td style="padding:10px 32px 34px;">${body}</td></tr>
            <tr><td style="background:#fafaf9;border-top:1px solid #e7e5e4;padding:22px 32px;color:#71717a;font-size:12px;line-height:1.6;">${escapeHtml(footer)}</td></tr>
          </table>
        </td></tr>
      </table>
    </body>
  </html>`;
}

export function buildEditingAdminEmail(order: VerifiedEditingOrder): EmailContent {
  const amount = formatCurrency(order.total);
  const body = `
    <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:14px;padding:16px;color:#065f46;font-size:14px;font-weight:700;">
      Payment independently verified with Paystack. Amount received: ${escapeHtml(amount)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;border-collapse:collapse;">
      ${detailRow('Reference', order.reference)}
      ${detailRow('Service', order.serviceTitle)}
      ${detailRow('Photos', String(order.photoCount))}
      ${detailRow('Rate per photo', formatCurrency(order.unitPrice))}
      ${detailRow('Total paid', amount)}
      ${detailRow('Payment channel', order.paymentChannel || 'Not provided')}
      ${detailRow('Paid at', formatDate(order.paidAt))}
      ${detailRow('Customer', order.customerName)}
      ${detailRow('Email', order.customerEmail)}
      ${detailRow('Phone', order.customerPhone)}
    </table>
    <div style="margin-top:22px;background:#fafaf9;border-radius:14px;padding:18px;">
      <div style="font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:#a16207;">Editing instructions</div>
      <p style="margin:10px 0 0;color:#3f3f46;font-size:14px;line-height:1.7;">${htmlLines(order.instructions)}</p>
    </div>
    <p style="margin:22px 0 0;color:#52525b;font-size:14px;line-height:1.7;">Reply directly to this email to contact the customer and arrange secure image transfer.</p>`;

  return {
    subject: `Paid editing order ${order.reference}`,
    text: [
      'New paid photo-editing order',
      `Reference: ${order.reference}`,
      `Service: ${order.serviceTitle}`,
      `Photos: ${order.photoCount}`,
      `Total paid: ${amount}`,
      `Customer: ${order.customerName}`,
      `Email: ${order.customerEmail}`,
      `Phone: ${order.customerPhone}`,
      `Instructions: ${order.instructions}`,
      'Payment was independently verified with Paystack.',
    ].join('\n'),
    html: emailShell(
      `New paid editing order ${order.reference}`,
      'A new editing order is ready',
      'The payment has been verified and the customer is ready for the image-transfer instructions.',
      body,
      'This is an automated order notification from the MkayGraphics & Photography website.',
    ),
  };
}

export function buildEditingCustomerEmail(order: VerifiedEditingOrder): EmailContent {
  const amount = formatCurrency(order.total);
  const firstName = order.customerName.split(/\s+/)[0] || order.customerName;
  const body = `
    <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:14px;padding:16px;color:#065f46;font-size:14px;font-weight:700;">
      Payment confirmed. Your order is now in our editing queue.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;border-collapse:collapse;">
      ${detailRow('Payment reference', order.reference)}
      ${detailRow('Editing service', order.serviceTitle)}
      ${detailRow('Number of photos', String(order.photoCount))}
      ${detailRow('Amount paid', amount)}
      ${detailRow('Expected turnaround', order.turnaroundTime)}
    </table>
    <div style="margin-top:24px;border:1px solid #fde68a;background:#fffbeb;border-radius:14px;padding:20px;">
      <div style="font-size:15px;font-weight:800;color:#18181b;">What happens next</div>
      <ol style="margin:12px 0 0;padding-left:20px;color:#52525b;font-size:14px;line-height:1.8;">
        <li>Our team reviews your editing instructions.</li>
        <li>We contact you with a secure way to send the original photos.</li>
        <li>Editing begins after we receive your files and confirm the brief.</li>
        <li>Your completed images are delivered digitally for review.</li>
      </ol>
    </div>
    <p style="margin:22px 0 0;color:#52525b;font-size:14px;line-height:1.7;">Keep your payment reference for support. You can reply to this email if you need to add an important note.</p>`;

  return {
    subject: `Payment confirmed for your editing order ${order.reference}`,
    text: [
      `Hello ${firstName},`,
      'Your payment has been confirmed and your order is now in our editing queue.',
      `Reference: ${order.reference}`,
      `Service: ${order.serviceTitle}`,
      `Photos: ${order.photoCount}`,
      `Amount paid: ${amount}`,
      `Expected turnaround: ${order.turnaroundTime}`,
      '',
      'Next steps:',
      '1. We review your instructions.',
      '2. We contact you with a secure way to send the original photos.',
      '3. Editing begins after the files and brief are confirmed.',
      '4. Completed images are delivered digitally for review.',
    ].join('\n'),
    html: emailShell(
      `Payment confirmed for ${order.reference}`,
      `Thank you, ${firstName}. Your order is confirmed.`,
      'We have received your payment and are preparing the next step for your photo-editing project.',
      body,
      'Need help? Reply to this email and include your payment reference.',
    ),
  };
}

export function buildContactAdminEmail(message: ContactMessage): EmailContent {
  const body = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      ${detailRow('Name', message.name)}
      ${detailRow('Email', message.email)}
      ${detailRow('Phone', message.phone)}
      ${detailRow('Service', message.service || 'General enquiry')}
      ${message.company ? detailRow('Company', message.company) : ''}
      ${message.timeline ? detailRow('Timeline', message.timeline) : ''}
    </table>
    <div style="margin-top:22px;background:#fafaf9;border-radius:14px;padding:18px;">
      <div style="font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:#a16207;">Message</div>
      <p style="margin:10px 0 0;color:#3f3f46;font-size:14px;line-height:1.7;">${htmlLines(message.message)}</p>
    </div>`;

  return {
    subject: `New website enquiry: ${message.service || 'General enquiry'}`,
    text: [
      'New website enquiry',
      `Name: ${message.name}`,
      `Email: ${message.email}`,
      `Phone: ${message.phone}`,
      `Service: ${message.service || 'General enquiry'}`,
      message.company ? `Company: ${message.company}` : '',
      message.timeline ? `Timeline: ${message.timeline}` : '',
      `Message: ${message.message}`,
    ].filter(Boolean).join('\n'),
    html: emailShell(
      `New enquiry from ${message.name}`,
      'A new website enquiry arrived',
      'Reply to this email to respond directly to the customer.',
      body,
      'This message was submitted through the MkayGraphics & Photography website.',
    ),
  };
}

export function buildContactCustomerEmail(message: ContactMessage): EmailContent {
  const firstName = message.name.split(/\s+/)[0] || message.name;
  const body = `
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:14px;padding:18px;color:#713f12;font-size:14px;line-height:1.7;">
      We received your enquiry about <strong>${escapeHtml(message.service || 'our services')}</strong>. Our team will review it and respond as soon as possible.
    </div>
    <p style="margin:22px 0 0;color:#52525b;font-size:14px;line-height:1.7;">For an urgent request, reply to this email or contact us on WhatsApp at +233 59 251 5464.</p>`;

  return {
    subject: 'We received your message',
    text: `Hello ${firstName},\n\nWe received your enquiry about ${message.service || 'our services'}. Our team will review it and respond as soon as possible.\n\nFor urgent requests, reply to this email or contact us on WhatsApp at +233 59 251 5464.`,
    html: emailShell(
      'Your message has reached our team',
      `Thanks for reaching out, ${firstName}.`,
      'Your message has been delivered to the MkayGraphics & Photography team.',
      body,
      'This is an automatic confirmation. You can reply directly to continue the conversation.',
    ),
  };
}
