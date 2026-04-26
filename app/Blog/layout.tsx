import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog | MkayGraphix - Creative Tips, Framing Guides & Printing Insights",
  description:
    "Read the MkayGraphix blog for framing guides, photo editing tips, printing ideas, photobook inspiration, and design insights for clients in Ghana.",
  keywords: [
    "MkayGraphix blog",
    "framing tips Ghana",
    "photo editing blog",
    "printing ideas Ghana",
    "photobook inspiration",
    "graphic design insights Ghana",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/blog",
  },
  openGraph: {
    title: "MkayGraphix Blog",
    description:
      "Creative tips, framing guides, printing ideas, photobook inspiration, and design insights from MkayGraphix.",
    images: ["/images/blog.png"],
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
