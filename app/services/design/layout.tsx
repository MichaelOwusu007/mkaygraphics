import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphic Design Services Ghana | MkayGraphics & Photography",
  description:
    "Professional graphic design in Ghana for brand identity, logo design, social media, packaging, campaigns, publications, and more from MkayGraphics & Photography.",
  keywords: [
    "graphic design Ghana",
    "logo design Ghana",
    "brand identity design",
    "social media graphics",
    "business card design",
    "flyer design",
  ],
  openGraph: {
    title: "Graphic Design Services Ghana | MkayGraphics & Photography",
    description:
      "Purposeful graphic design for brands, campaigns, social media, packaging, publications, and print.",
    images: ["/images/graphic-design-studio-hero.png"],
  },
};

export default function DesignServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
