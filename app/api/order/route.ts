import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      items,
      serviceItems,
      total,
      shippingInfo,
      paymentMethod,
      paymentReference,
      orderType,
    } = await request.json()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    })

    const formatCurrency = (amount: number) => `GH₵${amount.toFixed(2)}`

    const itemsList = items
      ?.map(
        (item: { productName: string; quantity: number; price: number; selectedVariants?: Record<string, string> }) =>
          `<tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
              <strong>${item.productName}</strong>
              ${item.selectedVariants ? `<br><small style="color: #666;">${Object.values(item.selectedVariants).join(", ")}</small>` : ""}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.price * item.quantity)}</td>
          </tr>`
      )
      .join("") || ""

    const servicesList = serviceItems
      ?.map(
        (item: { serviceTitle: string; photoCount: number; totalPrice: number }) =>
          `<tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
              <strong>${item.serviceTitle}</strong>
              <br><small style="color: #666;">${item.photoCount} photo(s)</small>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">1</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.totalPrice)}</td>
          </tr>`
      )
      .join("") || ""

    const allItems = itemsList + servicesList

    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #333); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; color: #f59e0b;">🛒 New Order Received!</h1>
          <p style="margin: 10px 0 0; opacity: 0.8;">FrameStation / MkayGraphix</p>
        </div>
        
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            Order Details
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0;"><strong>Order Type:</strong></td>
              <td style="text-align: right; color: #f59e0b; font-weight: bold;">${orderType || "Shop Order"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Payment Method:</strong></td>
              <td style="text-align: right;">${paymentMethod || "Pending"}</td>
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
          </table>

          ${shippingInfo ? `
          <h3 style="color: #1a1a1a; margin-top: 30px;">📍 Shipping Address</h3>
          <div style="background: #f9f9f9; border-radius: 8px; padding: 15px;">
            <p style="margin: 0;">${shippingInfo.name}</p>
            <p style="margin: 5px 0; color: #666;">${shippingInfo.address}</p>
            <p style="margin: 0; color: #666;">${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}</p>
            <p style="margin: 5px 0 0; color: #666;">${shippingInfo.country}</p>
          </div>
          ` : ""}

          <h3 style="color: #1a1a1a; margin-top: 30px;">📦 Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 12px; text-align: left;">Item</th>
                <th style="padding: 12px; text-align: center;">Qty</th>
                <th style="padding: 12px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${allItems || "<tr><td colspan='3' style='padding: 20px; text-align: center;'>No items</td></tr>"}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 15px 12px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 15px 12px; text-align: right; font-weight: bold; font-size: 1.2em; color: #059669;">${formatCurrency(total)}</td>
              </tr>
            </tfoot>
          </table>

          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 8px;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Quick Actions:</strong><br>
              <a href="https://wa.me/233592515464" style="color: #059669;">💬 WhatsApp Customer</a> |
              <a href="mailto:${customerEmail}" style="color: #059669;">📧 Email Customer</a>
            </p>
          </div>
        </div>

        <div style="background: #1a1a1a; color: #888; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Received via FrameStation Website</p>
        </div>
      </div>
    `

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #333); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; color: #f59e0b;">✨ Order Confirmed!</h1>
          <p style="margin: 10px 0 0; opacity: 0.8;">Thank you for choosing MkayGraphix</p>
        </div>
        
        <div style="padding: 30px; background: #fff;">
          <p>Dear <strong>${customerName}</strong>,</p>
          
          <p>Thank you for your order! We've received your request and will begin processing it shortly.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Order Total:</strong> <span style="font-size: 1.3em; color: #059669; font-weight: bold;">${formatCurrency(total)}</span></p>
            <p style="margin: 5px 0 0;"><strong>Order Type:</strong> ${orderType || "Shop Order"}</p>
            ${paymentMethod ? `<p style="margin: 5px 0 0;"><strong>Payment:</strong> ${paymentMethod}</p>` : ""}
          </div>

          <h3 style="color: #1a1a1a;">📦 Your Order</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${allItems || "<tr><td colspan='3' style='padding: 10px;'>No items</td></tr>"}
            </tbody>
          </table>

          <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;">
              <strong>What happens next?</strong><br><br>
              1. We'll review your order<br>
              2. We'll contact you via WhatsApp or email to confirm details<br>
              3. We'll begin work on your order<br>
              4. You'll receive updates on progress
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

    const ownerMailOptions = {
      from: `"MkayGraphix Orders" <${process.env.NODEMAILER_EMAIL}>`,
      to: process.env.NODEMAILER_RECEIVER,
      subject: `🛒 New Order - ${customerName} - ${formatCurrency(total)}`,
      html: ownerEmailHtml,
    }

    const customerMailOptions = {
      from: `"MkayGraphix" <${process.env.NODEMAILER_EMAIL}>`,
      to: customerEmail,
      subject: `✨ Order Confirmed - MkayGraphix`,
      html: customerEmailHtml,
    }

    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(customerMailOptions),
    ])

    return NextResponse.json({
      success: true,
      message: "Order created and notifications sent",
    })
  } catch (error) {
    console.error("Order API error:", error)
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    )
  }
}
