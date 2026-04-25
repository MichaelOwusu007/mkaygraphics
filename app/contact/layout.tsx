import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | MkayGraphix - Custom Frames, Photo Editing & Design Services",
  description:
    "Contact MkayGraphix for custom framing, photo editing, printing, and design services in Ghana. Reach us via phone (+233 592 515 464), WhatsApp, or email. We serve all of Ghana.",
  keywords: [
    "contact MkayGraphix",
    "MkayGraphix phone number",
    "custom framing Ghana",
    "photo editing contact",
    "printing services contact",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/contact",
  },
  openGraph: {
    title: "Contact Us | MkayGraphix",
    description:
      "Contact MkayGraphix for custom framing, photo editing, printing, and design services in Ghana.",
    images: ["/images/contactbanner.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
