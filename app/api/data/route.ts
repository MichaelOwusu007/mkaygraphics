// app/api/admin/data/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // 🚨 not public

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function GET() {
  try {
    // Fetch orders with their items and profiles
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select(`
        id,
        created_at,
        status,
        total,
        profiles (
          id,
          name,
          email
        ),
        order_items (
          id,
          product_name,
          quantity,
          price
        )
      `)
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error("orders fetch error:", ordersError);
      return NextResponse.json({ error: ordersError.message }, { status: 500 });
    }

    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select("id, name, email, phone");

    if (usersError) {
      console.error("users fetch error:", usersError);
      return NextResponse.json({ error: usersError.message }, { status: 500 });
    }

    return NextResponse.json({ orders, users });
  } catch (err) {
    console.error("Error fetching admin data:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
