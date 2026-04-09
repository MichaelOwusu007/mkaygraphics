import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, email, name, phone, orderId } = await request.json()

    if (!amount || !email) {
      return NextResponse.json(
        { error: "Amount and email are required" },
        { status: 400 }
      )
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY

    if (!paystackSecret) {
      return NextResponse.json(
        { error: "Paystack not configured" },
        { status: 500 }
      )
    }

    const amountInKobo = Math.round(amount * 100)

    const reference = `FS-${orderId}-${Date.now()}`

    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/checkout?payment=success&ref=${reference}`

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInKobo,
        email,
        name,
        phone,
        reference,
        callback_url: callbackUrl,
        metadata: {
          orderId,
          customerName: name,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Paystack error:", data)
      return NextResponse.json(
        { error: data.message || "Payment initialization failed" },
        { status: response.status }
      )
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      accessCode: data.data.access_code,
    })
  } catch (error) {
    console.error("Paystack API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const reference = searchParams.get("reference")

  if (!reference) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 })
  }

  const paystackSecret = process.env.PAYSTACK_SECRET_KEY

  if (!paystackSecret) {
    return NextResponse.json(
      { error: "Paystack not configured" },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Verification failed" },
        { status: response.status }
      )
    }

    return NextResponse.json({
      status: data.data.status,
      reference: data.data.reference,
      amount: data.data.amount / 100,
      customer: data.data.customer,
    })
  } catch (error) {
    console.error("Paystack verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
