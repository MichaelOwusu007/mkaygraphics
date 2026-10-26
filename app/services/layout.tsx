import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography & Creative Services in Ghana",
  description:
    "Explore photography and creative services from MkayGraphics & Photography, including custom framing, photo editing, printing, photobooks, and graphic design across Ghana.",
  keywords: [
    "MkayGraphics services",
    "custom framing services Ghana",
    "photo editing services",
    "printing services Ghana",
    "photobooks Ghana",
    "graphic design services",
    "photography services Ghana",
    "portrait photography Ghana",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/services",
  },
  openGraph: {
    title: "MkayGraphics & Photography | Creative Services Ghana",
    description:
      "Explore photography and creative services from MkayGraphics & Photography, including framing, editing, printing, photobooks, and graphic design in Ghana.",
    images: ["/images/services.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
