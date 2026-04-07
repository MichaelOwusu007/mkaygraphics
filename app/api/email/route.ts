import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

export async function POST(request: NextRequest) {
  const { email, name, message, contact, service } = await request.json()

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions: Mail.Options = {
    from: `"MkayGraphix" <${process.env.NODEMAILER_EMAIL}>`,
    to: process.env.NODEMAILER_RECEIVER,
    subject: `📩 Service Inquiry - ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>📨 New Service Inquiry from ${name}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #4F46E5;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <p style="margin-top: 30px;">Sent from the MkayGraphix Website ✨</p>
      </div>
    `,
  }

  try {
    await transport.sendMail(mailOptions)
    return NextResponse.json({ message: "Success!", status: 200 })
  } catch (error) {
    console.error("Email send failed:", error)
    return NextResponse.json({ message: "Failed!", status: 500 })
  }
}
