import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, name, phone, message, service, company, timeline } = body

  const phoneRegex = /^(\+233|233|0)5[89]\d{7}$/
  if (!phone || !phoneRegex.test(phone)) {
    return NextResponse.json({ message: "Invalid phone format. Use +233592515464, 233592515464, or 0592515464", status: 400 }, { status: 400 })
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions: Mail.Options = {
    from: `"MkayGraphics" <${process.env.NODEMAILER_EMAIL}>`,
    to: process.env.NODEMAILER_RECEIVER,
    subject: `📩 Service Inquiry - ${service || "General"}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>📨 New Service Inquiry from ${name}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #4F46E5;">
          ${message?.replace(/\n/g, "<br>") || "No message"}
        </div>
        <p style="margin-top: 30px;">Sent from the MkayGraphics Website ✨</p>
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
