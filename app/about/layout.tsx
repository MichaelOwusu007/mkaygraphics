export const metadata = {
  title: "About Our Photography & Creative Studio in Ghana",
  description:
    "Learn about MkayGraphics, Ghana's photography and creative studio for custom framing, photo editing, printing, photobooks, and graphic design.",
  keywords: [
    "about MkayGraphics",
    "MkayGraphics story",
    "custom framing Ghana",
    "photo editing company Ghana",
    "photography studio Ghana",
  ],
  alternates: {
    canonical: "https://www.mkaygraphix.site/about",
  },
  openGraph: {
    title: "About MkayGraphics & Photography | Creative Studio Ghana",
    description:
      "Meet MkayGraphics, a Ghanaian photography and creative studio helping people shoot, edit, frame, print, and design meaningful stories.",
    images: ["/images/about.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
