import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Editing Services | Professional Photo Retouching in Ghana",
  description:
    "Professional photo editing services in Ghana. Expert retouching, color correction, background removal, and more. Starting at GH₵5 per photo. Fast turnaround time.",
  keywords: [
    "photo editing Ghana",
    "photo retouching Ghana",
    "image editing services",
    "color correction",
    "background removal",
    "photo enhancement",
  ],
  openGraph: {
    title: "Photo Editing Services | MkayGraphix",
    description:
      "Professional photo editing services in Ghana. Expert retouching, color correction, and more.",
    images: ["/images/photo-editing.jpg"],
  },
};

export default function EditingServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
