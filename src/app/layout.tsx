import type { Metadata } from "next";
import { Analytics } from "@/components/seo/Analytics";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.subhead,
  openGraph: { type: "website", siteName: SITE.name, url: SITE.url, images: [SITE.defaultOg] },
  twitter: { card: "summary_large_image", site: SITE.twitter },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
