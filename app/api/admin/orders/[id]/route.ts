import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

interface UpdatePayload {
  status?: string;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Accept params as Promise
) {
  try {
    const { id } = await context.params; // ✅ Await the params promise
    const body: UpdatePayload = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    if (!body.status) {
      return NextResponse.json({ error: "Missing status" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("orders")
      .update({ status: body.status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Order update error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to update order status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
