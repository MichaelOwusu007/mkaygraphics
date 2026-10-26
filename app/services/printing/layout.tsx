import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Printing Services in Ghana",
  description:
    "Professional printing services in Ghana for wedding stationery, custom apparel, banners, business materials, flyers, posters, labels, gifts, certificates, books, and photo prints.",
  keywords: [
    "printing services Ghana",
    "wedding cards printing Ghana",
    "custom t-shirt printing",
    "banner printing Accra",
    "business cards printing",
    "flyer printing Ghana",
    "photo printing",
  ],
  openGraph: {
    title: "Printing Services | MkayGraphics & Photography",
    description:
      "Explore professional printing for events, businesses, brands, gifts, apparel, publications, and photography.",
    images: ["/images/printing-studio-hero.png"],
  },
};

export default function PrintingServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
