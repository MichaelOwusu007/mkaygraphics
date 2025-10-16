// app/api/admin/cleanup-delivered-orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export async function GET(req: NextRequest) {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return NextResponse.json(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting cleanup of delivered orders older than 24 hours...");

    // 24 hours ago timestamp
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const { data: deletedOrders, error } = await supabase
      .from("orders")
      .delete()
      .eq("status", "delivered")
      .lt("delivered_at", twentyFourHoursAgo.toISOString())
      .select();

    if (error) {
      console.error("Error deleting old orders:", error);
      return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }

    console.log(`Successfully deleted ${deletedOrders?.length || 0} orders`);

    return NextResponse.json(
      {
        success: true,
        deletedCount: deletedOrders?.length || 0,
        message: `Deleted ${deletedOrders?.length || 0} delivered orders older than 24 hours`,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("Error in cleanup function:", err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}
