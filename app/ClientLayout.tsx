// app/ClientLayout.tsx
"use client";

import { Toaster } from "sonner";
import { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/headers/MainHeader";
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <CartDrawer />   {/* ✅ Mount it globally */}
      <main className="min-h-screen">{children}</main>
      <Toaster position="bottom-right" richColors />
    </>
  );
}
