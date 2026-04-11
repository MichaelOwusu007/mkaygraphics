export const metadata = {
  title: "Shop Custom Frames Online | Premium Framed Art & Photo Frames",
  description:
    "Shop custom frames online in Ghana. Premium handcrafted frames for photos, artwork, and more. High quality materials including wood, metal, and gold finishes. Free delivery on orders over GH₵500.",
  keywords: [
    "shop frames Ghana",
    "custom frames online",
    "photo frames Ghana",
    "wall frames",
    "picture frames",
    "wooden frames",
    "metal frames",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/shop",
  },
  openGraph: {
    title: "Shop Frames | MkayGraphix",
    description:
      "Shop custom frames online in Ghana. Premium handcrafted frames for photos and artwork.",
    images: ["/images/shop.jpg"],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
