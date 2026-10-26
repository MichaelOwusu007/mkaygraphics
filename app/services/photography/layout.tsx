import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Photography Services Coming Soon",
  description:
    "Professional portrait, event, product, and brand photography is coming soon to MkayGraphics & Photography in Ghana. Discover what we are preparing and be first to book.",
  alternates: {
    canonical: "/services/photography",
  },
  openGraph: {
    title: "Photography Services Coming Soon | MkayGraphics & Photography",
    description:
      "Portraits, events, products, and brand stories, professionally photographed and beautifully finished by MkayGraphics & Photography.",
    images: ["/images/photography-studio-hero.png"],
  },
};

export default function PhotographyLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
