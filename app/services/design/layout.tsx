import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphic Design Services Ghana | Logo Design, Brand Identity & More",
  description:
    "Professional graphic design services in Ghana. Logo design, brand identity, social media graphics, and more. Creative designs that make your business stand out.",
  keywords: [
    "graphic design Ghana",
    "logo design Ghana",
    "brand identity design",
    "social media graphics",
    "business card design",
    "flyer design",
  ],
  openGraph: {
    title: "Graphic Design Services | MkayGraphics & Photography",
    description:
      "Professional graphic design services in Ghana. Logo design, brand identity, and more.",
    images: ["/images/design.jpg"],
  },
};

export default function DesignServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
