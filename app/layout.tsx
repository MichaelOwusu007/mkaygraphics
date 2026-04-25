import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Archivo_Black, Poppins } from "next/font/google";
import ClientLayout from "./ClientLayout";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const archivo = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: "400",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = "https://www.mkaygraphix.site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "MkayGraphix | Premium Frames, Photo Editing, Printing & Design Services in Ghana",
    template: "%s | MkayGraphix",
  },
  description:
    "Ghana's premier destination for custom framing, photo editing, printing services, photobooks, and graphic design. We frame, edit, and design it best for you. Shop frames online or book our professional services.",
  keywords: [
    "custom frames Ghana",
    "photo editing Ghana",
    "photobooks Ghana",
    "printing services Accra",
    "graphic design Ghana",
    "wedding cards printing",
    "custom t-shirt printing",
    "photo album Ghana",
    "framing services",
    "MkayGraphix",
  ],
  authors: [{ name: "MkayGraphix" }],
  creator: "MkayGraphix",
  publisher: "MkayGraphix",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: BASE_URL,
    siteName: "MkayGraphix",
    title: "MkayGraphix | Premium Frames, Photo Editing & Design Services in Ghana",
    description:
      "Ghana's premier destination for custom framing, photo editing, printing services, photobooks, and graphic design. Shop frames online or book professional services.",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "MkayGraphix - Premium Frames, Photo Editing & Design Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MkayGraphix | Premium Frames, Photo Editing & Design Services in Ghana",
    description:
      "Ghana's premier destination for custom framing, photo editing, printing services, photobooks, and graphic design.",
    images: ["/images/og-image.svg"],
    creator: "@MkayGraphix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${archivo.variable} ${poppins.variable}`}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="geo.region" content="GH" />
        <meta name="geo.country" content="Ghana" />
        <meta name="geo.placename" content="Accra" />

        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/favicon.svg" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="MkayGraphix RSS Feed" href="/feed.xml" />

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MkayGraphix",
              description:
                "Ghana's premier destination for custom framing, photo editing, printing services, photobooks, and graphic design.",
              url: BASE_URL,
              logo: `${BASE_URL}/images/logo2.jpg`,
              image: `${BASE_URL}/images/og-image.svg`,
              telephone: "+233-592-515-464",
              email: "mkaygraphix@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Accra",
                addressCountry: "GH",
              },
              sameAs: [
                "https://facebook.com/mkaygraphix",
                "https://instagram.com/mkaygraphix",
              ],
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00",
              },
            }),
          }}
        />

        {/* LocalBusiness Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "MkayGraphix",
              description: "Premium custom framing, photo editing, and design services in Ghana",
              url: BASE_URL,
              telephone: "+233-592-515-464",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Accra",
                addressCountry: "GH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "5.6037",
                longitude: "-0.1870",
              },
              openingHours: "Mo-Fr 09:00-18:00, Sa 10:00-16:00",
              priceRange: "$$",
              serviceType: [
                "Custom Framing",
                "Photo Editing",
                "Printing Services",
                "Photobooks",
                "Graphic Design",
              ],
            }),
          }}
        />

        {/* Services Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Creative Services",
              provider: {
                "@type": "Organization",
                name: "MkayGraphix",
              },
              areaServed: {
                "@type": "Country",
                name: "Ghana",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Creative Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Custom Framing",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Photo Editing",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Printing Services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Photobooks",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Graphic Design",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* BreadcrumbList Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: BASE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Shop",
                  item: `${BASE_URL}/shop`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item: `${BASE_URL}/services`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Contact",
                  item: `${BASE_URL}/contact`,
                },
              ],
            }),
          }}
        />
      </head>

      <body className={`${poppins.className} text-lg text-black`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
