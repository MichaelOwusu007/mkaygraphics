import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Photography & Creative Blog in Ghana",
  description:
    "Read the MkayGraphics blog for photography inspiration, framing guides, photo editing tips, printing ideas, photobooks, and design insights in Ghana.",
  keywords: [
    "MkayGraphics blog",
    "framing tips Ghana",
    "photo editing blog",
    "printing ideas Ghana",
    "photobook inspiration",
    "graphic design insights Ghana",
    "photography blog Ghana",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/blog",
  },
  openGraph: {
    title: "MkayGraphics & Photography | Creative Blog Ghana",
    description:
      "Photography inspiration, creative tips, framing guides, printing ideas, photobooks, and design insights from MkayGraphics.",
    images: ["/images/blog.png"],
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
