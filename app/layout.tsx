import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const display = localFont({
  src: "./fonts/Archivo.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | IJshockey in Leiden`,
    template: `%s | ${site.name}`,
  },
  description:
    "IJshockeyclub Leiden Lions. De snelste teamsport ter wereld, elke zaterdag in Schaatshal Leiden. Jeugd, senioren en een ijshockeyschool voor beginners. Schrijf je in.",
  keywords: [
    "ijshockey Leiden",
    "Leiden Lions",
    "ijshockeyclub",
    "ijshockeyschool",
    "schaatshal Leiden",
    "ijshockey vereniging",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.fullName,
    title: `${site.fullName} | IJshockey in Leiden`,
    description:
      "De snelste teamsport ter wereld, elke zaterdag in Schaatshal Leiden. Kom proeftrainen.",
    images: [{ url: "/web-app-manifest-512x512.png", width: 512, height: 512, alt: "Leiden Lions" }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a1430",
  colorScheme: "light",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: site.fullName,
  sport: "Ice hockey",
  url: site.url,
  email: site.email,
  logo: `${site.url}/web-app-manifest-512x512.png`,
  location: {
    "@type": "Place",
    name: site.rink.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.rink.street,
      postalCode: "2332 AA",
      addressLocality: "Leiden",
      addressCountry: "NL",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[var(--z-tooltip)] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Naar hoofdinhoud
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
