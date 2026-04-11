export const metadata = {
  title: "About Us | MkayGraphix - Our Story & Mission",
  description:
    "Learn about MkayGraphix - Ghana's premier destination for custom framing, photo editing, printing services, and graphic design. Our mission is to frame, edit, and design it best for you.",
  keywords: [
    "about MkayGraphix",
    "MkayGraphix story",
    "custom framing Ghana",
    "photo editing company Ghana",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/about",
  },
  openGraph: {
    title: "About Us | MkayGraphix",
    description:
      "Learn about MkayGraphix - Ghana's premier destination for custom framing and design services.",
    images: ["/images/about.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
