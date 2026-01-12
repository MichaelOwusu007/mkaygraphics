// app/contact/layout.tsx
export const metadata = {
  title: "Contact | MKay Graphix",
  description: "Contact MKay Graphix for branding and design services.",
  alternates: {
    canonical: "https://www.mkaygraphix.site/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
