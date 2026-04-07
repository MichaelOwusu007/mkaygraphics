import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

export async function POST(request: NextRequest) {
  const { name, email, phone, photobookType, pages, coverStyle, eventDate, specialRequests, deliveryAddress, message, serviceType } = await request.json()

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions: Mail.Options = {
    from: `"MkayGraphix Photobooks" <${process.env.NODEMAILER_EMAIL}>`,
    to: process.env.NODEMAILER_RECEIVER,
    subject: `📖 Photobook Inquiry - ${photobookType}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 16px 16px 0 0;">
          <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">📖 New Photobook Inquiry</h1>
          <p style="color: #9ca3af; margin: 10px 0 0;">Received via MkayGraphix Website</p>
        </div>
        
        <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
          <!-- Customer Info -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
              👤 Customer Information
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px;">Name:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></td>
              </tr>
            </table>
          </div>

          <!-- Photobook Details -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
              📖 Photobook Details
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px;">Photobook Type:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${photobookType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Number of Pages:</td>
                <td style="padding: 8px 0; font-weight: 600;">${pages || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Cover Style:</td>
                <td style="padding: 8px 0;">${coverStyle || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Event Date:</td>
                <td style="padding: 8px 0;">${eventDate || 'Not specified'}</td>
              </tr>
            </table>
          </div>

          <!-- Special Requests -->
          ${specialRequests ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
              🎨 Special Requests & Themes
            </h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #fbbf24;">
              ${specialRequests}
            </div>
          </div>
          ` : ''}

          <!-- Delivery Address -->
          ${deliveryAddress ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
              📍 Delivery Address
            </h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #fbbf24;">
              ${deliveryAddress}
            </div>
          </div>
          ` : ''}

          <!-- Additional Notes -->
          ${message ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1a1a1a; font-size: 18px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #fbbf24;">
              📝 Additional Notes
            </h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
              ${message}
            </div>
          </div>
          ` : ''}

          <!-- Action Button -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}?subject=Re: Photobook Inquiry - ${photobookType}" 
               style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #1a1a1a; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Reply to Customer
            </a>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">MkayGraphix - Premium Photobooks</p>
          <p style="margin: 5px 0 0;">Cape Coast, Ghana | +233 XX XXX XXXX</p>
        </div>
      </div>
    `,
  }

  try {
    await transport.sendMail(mailOptions)
    return NextResponse.json({ message: "Photobook inquiry submitted successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Email send failed:", error)
    return NextResponse.json({ message: "Failed to submit inquiry. Please try again." }, { status: 500 })
  }
}
