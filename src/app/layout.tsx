import type { Metadata, Viewport } from "next";
import "@fontsource/mukta/400.css";
import "@fontsource/mukta/500.css";
import "@fontsource/mukta/700.css";
import "@fontsource/mukta/800.css";
import "@fontsource/kalam/400.css";
import "@fontsource/kalam/700.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { UtmCapture } from "@/components/UtmCapture";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — automation for companies and institutes`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1d2e6e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="min-h-dvh flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <UtmCapture />
      </body>
    </html>
  );
}
