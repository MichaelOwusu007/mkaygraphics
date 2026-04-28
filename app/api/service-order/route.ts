import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Service order received:", body)
    
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceTitle,
      photoCount,
      totalPrice,
      total,
      projectInfo,
      paymentMethod,
      paymentReference,
    } = body

    if (!customerName || !customerEmail || !customerPhone) {
      console.error("Missing required fields:", { customerName, customerEmail, customerPhone })
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    })

    const formatCurrency = (amount: number) => `GH₵${amount.toFixed(2)}`

    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #333); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; color: #f59e0b;">🎨 New Service Order!</h1>
          <p style="margin: 10px 0 0; opacity: 0.8;">MkayGraphix - Editing Services</p>
        </div>
        
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            Editing Service Order
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0;"><strong>Service Type:</strong></td>
              <td style="text-align: right; color: #f59e0b; font-weight: bold;">${serviceTitle}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Photo Count:</strong></td>
              <td style="text-align: right;">${photoCount} photos</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Payment Method:</strong></td>
              <td style="text-align: right;">${paymentMethod || "Paystack"}</td>
            </tr>
            ${paymentReference ? `
            <tr>
              <td style="padding: 8px 0;"><strong>Payment Ref:</strong></td>
              <td style="text-align: right; font-family: monospace;">${paymentReference}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px 0;"><strong>Total Amount:</strong></td>
              <td style="text-align: right; font-size: 1.3em; font-weight: bold; color: #059669;">${formatCurrency(total)}</td>
            </tr>
          </table>

          <h3 style="color: #1a1a1a; margin-top: 30px;">👤 Customer Information</h3>
          <table style="width: 100%; background: #f9f9f9; border-radius: 8px; padding: 15px;">
            <tr>
              <td style="padding: 8px 0;"><strong>Name:</strong></td>
              <td style="text-align: right;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Email:</strong></td>
              <td style="text-align: right;"><a href="mailto:${customerEmail}">${customerEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Phone:</strong></td>
              <td style="text-align: right;"><a href="tel:${customerPhone}">${customerPhone}</a></td>
            </tr>
            ${projectInfo?.company ? `
            <tr>
              <td style="padding: 8px 0;"><strong>Company:</strong></td>
              <td style="text-align: right;">${projectInfo.company}</td>
            </tr>
            ` : ""}
          </table>

          ${projectInfo ? `
          <h3 style="color: #1a1a1a; margin-top: 30px;">📝 Project Details</h3>
          <div style="background: #f9f9f9; border-radius: 8px; padding: 15px;">
            <p style="margin: 0;"><strong>Project Title:</strong> ${projectInfo.projectTitle}</p>
            <p style="margin: 10px 0 0;"><strong>Description:</strong></p>
            <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${projectInfo.projectDescription}</p>
            ${projectInfo.deadline ? `
            <p style="margin: 10px 0 0;"><strong>Deadline:</strong> ${projectInfo.deadline}</p>
            ` : ""}
            ${projectInfo.referenceLinks ? `
            <p style="margin: 10px 0 0;"><strong>Reference Links:</strong></p>
            <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${projectInfo.referenceLinks}</p>
            ` : ""}
            ${projectInfo.specialRequirements ? `
            <p style="margin: 10px 0 0;"><strong>Special Requirements:</strong></p>
            <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${projectInfo.specialRequirements}</p>
            ` : ""}
          </div>
          ` : ""}

          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 8px;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Quick Actions:</strong><br>
              <a href="https://wa.me/233592515464" style="color: #059669;">💬 WhatsApp Customer</a> |
              <a href="mailto:${customerEmail}" style="color: #059669;">📧 Email Customer</a>
            </p>
          </div>
        </div>

        <div style="background: #1a1a1a; color: #888; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Received via MkayGraphix Website - Editing Services</p>
        </div>
      </div>
    `

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #333); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; color: #f59e0b;">✨ Service Order Confirmed!</h1>
          <p style="margin: 10px 0 0; opacity: 0.8;">Thank you for choosing MkayGraphix</p>
        </div>
        
        <div style="padding: 30px; background: #fff;">
          <p>Dear <strong>${customerName}</strong>,</p>
          
          <p>Thank you for your order! We've received your editing service request and will begin processing it shortly.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Service:</strong> ${serviceTitle}</p>
            <p style="margin: 5px 0 0;"><strong>Photo Count:</strong> ${photoCount} photos</p>
            <p style="margin: 5px 0 0;"><strong>Order Total:</strong> <span style="font-size: 1.3em; color: #059669; font-weight: bold;">${formatCurrency(total)}</span></p>
            <p style="margin: 5px 0 0;"><strong>Payment:</strong> ${paymentMethod || "Paystack"}</p>
            ${paymentReference ? `<p style="margin: 5px 0 0;"><strong>Ref:</strong> ${paymentReference}</p>` : ""}
          </div>

          ${projectInfo?.projectTitle ? `
          <h3 style="color: #1a1a1a;">📝 Your Project</h3>
          <div style="background: #f9f9f9; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0;"><strong>Title:</strong> ${projectInfo.projectTitle}</p>
            <p style="margin: 10px 0 0;"><strong>Description:</strong></p>
            <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${projectInfo.projectDescription}</p>
          </div>
          ` : ""}

          <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;">
              <strong>What happens next?</strong><br><br>
              1. We'll review your project details<br>
              2. We'll contact you via WhatsApp or email to confirm specifics<br>
              3. You'll receive a link to upload your photos<br>
              4. We'll begin editing and share progress updates<br>
              5. You'll receive your finished files
            </p>
          </div>

          <p style="margin-top: 20px;">
            Have questions? Contact us:<br>
            📞 <a href="tel:+233592515464">+233 592 515 464</a><br>
            💬 <a href="https://wa.me/233592515464">WhatsApp Us</a><br>
            📧 <a href="mailto:mkaygraphix@gmail.com">mkaygraphix@gmail.com</a>
          </p>

          <p style="margin-top: 30px;">Best regards,<br><strong>The MkayGraphix Team</strong></p>
        </div>

        <div style="background: #1a1a1a; color: #888; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} MkayGraphix. All rights reserved.</p>
        </div>
      </div>
    `

    const ownerMailOptions: Mail.Options = {
      from: `"MkayGraphix Service Orders" <${process.env.NODEMAILER_EMAIL}>`,
      to: process.env.NODEMAILER_RECEIVER,
      subject: `🎨 New Service Order - ${customerName} - ${formatCurrency(total)} - ${photoCount} photos`,
      html: ownerEmailHtml,
    }

    const customerMailOptions: Mail.Options = {
      from: `"MkayGraphix" <${process.env.NODEMAILER_EMAIL}>`,
      to: customerEmail,
      subject: `✨ Service Order Confirmed - MkayGraphix`,
      html: customerEmailHtml,
    }

    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(customerMailOptions),
    ])

    return NextResponse.json({
      success: true,
      message: "Service order created and notifications sent",
    })
  } catch (error) {
    console.error("Service Order API error:", error)
    return NextResponse.json(
      { error: "Failed to process service order" },
      { status: 500 }
    )
  }
}