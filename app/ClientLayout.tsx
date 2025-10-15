// app/ClientLayout.tsx
"use client";

import { Toaster } from "sonner";
import { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import HeaderWrapper from "@/components/headers/HeaderWrapper";
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderWrapper />
      <CartDrawer />   {/* ✅ Mount it globally */}
      <main className="min-h-screen">{children}</main>
      <Toaster position="top-right" richColors />
    </>
  );
}
