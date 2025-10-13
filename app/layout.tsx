// ✅ app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

// ✅ Google Fonts
import { Space_Grotesk, Archivo_Black, Poppins } from "next/font/google";

// ✅ Toast Notifications
import { Toaster } from "sonner";

// ✅ Client layout (handles Header, CartDrawer, Footer, etc.)
import ClientLayout from "./ClientLayout";

// ✅ Font setup
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

// ✅ SEO metadata
export const metadata = {
  title: "FrameStaion",
  description:
    "Your number one stop shop for all kinds of frames, edit services and design services as well.",
  alternates: {
    canonical: "https://www.giftysolves.com/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${archivo.variable} ${poppins.variable}`}
    >
      <head>
        {/* ✅ Basic SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />

        {/* ✅ Favicons */}
        <link
          rel="icon"
          href="/images/favicon.jpg"
          type="image/png"
          sizes="42x42"
        />
        <link rel="apple-touch-icon" href="/images/favicon.jpg" />

        {/* ✅ Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.giftysolves.com/" />
        <meta property="og:title" content="FrameStation" />
        <meta
          property="og:description"
          content="Gifty Solves Consult is a trusted agency assisting students and individuals to achieve their dreams of studying and settling abroad. We offer support for educational placement, scholarships, and more."
        />
        <meta
          property="og:image"
          content="https://www.giftysolves.com/images/slider-image1.jpg"
        />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.giftysolves.com/" />
        <meta name="twitter:title" content="Gifty Solves Edu Consult" />
        <meta
          name="twitter:description"
          content="Gifty Solves Consult is a trusted agency assisting students and individuals to achieve their dreams of studying and settling abroad. We offer support for educational placement, scholarships, and more."
        />
        <meta
          name="twitter:image"
          content="https://www.giftysolves.com/images/slider-image1.jpg"
        />

        {/* ✅ Structured Data (JSON-LD) for logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FrameStaion",
              url: "https://www.giftysolves.com",
              logo: "https://www.giftysolves.com/images/logo2.png",
            }),
          }}
        />
      </head>

      <body className={`${poppins.className} text-lg text-black`}>
        {/* ✅ ClientLayout handles all client-side components */}
        <ClientLayout>{children}</ClientLayout>

        {/* ✅ Toast notifications */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
