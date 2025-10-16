import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  id: string;
  order_id: string;
  address_line1: string;
  city: string;
  region: string;
  postal_code: string;
  phone?: string;
}

interface Profile {
  id: string;
  full_name: string;
  phone: string;
  email: string;
}

interface Order {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  order_items: OrderItem[];
  shipping_addresses: ShippingAddress[];
  profile?: Profile | null;
}

export async function GET() {
  try {
    // 1️⃣ Fetch orders with order_items and shipping_addresses
    const { data: orders, error: ordersError } = await supabaseServer
      .from("orders")
      .select("*, order_items(*), shipping_addresses(*)")
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error("orders fetch error:", ordersError);
      return NextResponse.json({ error: ordersError.message }, { status: 500 });
    }

    if (!orders) return NextResponse.json([]);

    // 2️⃣ Collect user IDs
    const userIds = [...new Set(orders.map((o) => o.user_id))];

    // 3️⃣ Fetch user profiles separately
    const { data: profiles, error: profilesError } = await supabaseServer
      .from("profiles")
      .select("*")
      .in("id", userIds);

    if (profilesError) {
      console.error("profiles fetch error:", profilesError);
      return NextResponse.json({ error: profilesError.message }, { status: 500 });
    }

    // 4️⃣ Attach profile data to each order
    const profilesById: Record<string, Profile> = {};
    (profiles || []).forEach((p) => {
      profilesById[p.id] = p;
    });

    const ordersWithProfiles: Order[] = orders.map((order) => ({
      ...order,
      profile: profilesById[order.user_id] || null,
    }));

    return NextResponse.json(ordersWithProfiles);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Error fetching admin orders:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
