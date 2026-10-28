import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Editing Services | Professional Photo Retouching in Ghana",
  description:
    "Professional photo editing services in Ghana. Expert retouching, color correction, background removal, and creative editing starting at GH₵20 per photo.",
  keywords: [
    "photo editing Ghana",
    "photo retouching Ghana",
    "image editing services",
    "color correction",
    "background removal",
    "photo enhancement",
  ],
  openGraph: {
    title: "Photo Editing Services | MkayGraphics & Photography",
    description:
      "Professional photo editing services in Ghana. Expert retouching, color correction, and more.",
    images: ["/images/banner.img3.jpg"],
  },
};

export default function EditingServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
