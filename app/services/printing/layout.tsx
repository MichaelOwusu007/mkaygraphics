import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Printing Services Ghana | Wedding Cards, T-Shirts, Banners & More",
  description:
    "Premium printing services in Ghana. Wedding cards, custom t-shirts, banners, business cards, flyers, and more. High quality prints with fast turnaround. Same-day delivery available.",
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
    title: "Printing Services | MkayGraphix",
    description:
      "Premium printing services in Ghana. Wedding cards, t-shirts, banners, and more.",
    images: ["/images/printing.jpg"],
  },
};

export default function PrintingServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
