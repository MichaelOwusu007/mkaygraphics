import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | MkayGraphix - Frames, Photo Editing, Printing & Design",
  description:
    "Explore all MkayGraphix services: Custom Framing, Photo Editing, Printing Services (wedding cards, t-shirts, banners), Photobooks, and Graphic Design. Professional services for all of Ghana.",
  keywords: [
    "MkayGraphix services",
    "custom framing services Ghana",
    "photo editing services",
    "printing services Ghana",
    "photobooks Ghana",
    "graphic design services",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/services",
  },
  openGraph: {
    title: "Our Services | MkayGraphix",
    description:
      "Explore all MkayGraphix services: Custom Framing, Photo Editing, Printing, Photobooks, and Graphic Design.",
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
