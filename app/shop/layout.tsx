// app/shop/layout.tsx
export const metadata = {
  title: "Shop | MKay Graphix",
  description: "Shop MKay Graphix products and services.",
  alternates: {
    canonical: "https://www.mkaygraphix.site/shop",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
