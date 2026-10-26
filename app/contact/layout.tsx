import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Photography & Creative Studio in Ghana",
  description:
    "Contact MkayGraphics for photography, custom framing, photo editing, printing, photobooks, and graphic design services in Ghana. Reach us by phone, WhatsApp, or email.",
  keywords: [
    "contact MkayGraphics",
    "MkayGraphics phone number",
    "custom framing Ghana",
    "photo editing contact",
    "printing services contact",
    "photography services contact Ghana",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/contact",
  },
  openGraph: {
    title: "Contact MkayGraphics & Photography",
    description:
      "Contact MkayGraphics for photography, custom framing, photo editing, printing, photobooks, and graphic design in Ghana.",
    images: ["/images/contactbanner.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
