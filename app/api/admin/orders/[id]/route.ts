import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

interface UpdatePayload {
  status: string;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: UpdatePayload = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    if (!body.status) {
      return NextResponse.json({ error: "Missing status" }, { status: 400 });
    }

    // ✅ Update the order status
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

    // ✅ Return updated order
    return NextResponse.json({ success: true, order: data });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("PATCH error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
