// app/about/layout.tsx
export const metadata = {
  title: "About | MKay Graphix",
  description: "About MKay Graphix professional digital services.",
  alternates: {
    canonical: "https://www.mkaygraphix.site/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
