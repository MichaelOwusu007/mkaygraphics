import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photobooks Ghana | Wedding Albums, Graduation Books & Family Albums",
  description:
    "Beautiful custom photobooks in Ghana. Wedding albums, graduation books, family albums, and more. Premium quality with personalized designs. Perfect for capturing Ghanaian celebrations.",
  keywords: [
    "photobooks Ghana",
    "wedding albums Ghana",
    "graduation albums Ghana",
    "photo books Accra",
    "family photo albums",
    "custom photobooks",
  ],
  openGraph: {
    title: "Photobooks | MkayGraphix",
    description:
      "Beautiful custom photobooks in Ghana. Wedding albums, graduation books, and more.",
    images: ["/images/photobook.jpg"],
  },
};

export default function PhotobookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
