import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "@/theme/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE, siteUrl } from "@/lib/site";
import { ConsentMode } from "@/components/analytics/ConsentMode";
import { GoogleAdsTag } from "@/components/analytics/GoogleAdsTag";
import { CookieConsent } from "@/components/layout/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default:
      "Mobile Tyre Fitting Glasgow, Edinburgh & Dundee | 24/7 Emergency | Duke Street Tyres",
    template: "%s | Duke Street Tyres",
  },
  description:
    "24/7 mobile tyre fitting and emergency call-out across Glasgow, Edinburgh and Dundee. Average response 30–40 mins. Cars, vans, 4x4s. Card & Apple Pay accepted.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GB",
    url: siteUrl("/"),
    title:
      "Mobile Tyre Fitting Glasgow, Edinburgh & Dundee | 24/7 Emergency",
    description:
      "Emergency mobile tyre fitting across Scotland's central belt. 24/7. Average response 30–40 mins.",
    images: [{ url: "/photos/van.webp", alt: `${SITE.name} mobile tyre fitting van` }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mobile Tyre Fitting Glasgow, Edinburgh & Dundee | 24/7 Emergency",
    description:
      "Emergency mobile tyre fitting across Scotland's central belt. 24/7. Average response 30–40 mins.",
    images: ["/photos/van.webp"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${bebas.variable}`} suppressHydrationWarning>
      <head>
        <ConsentMode />
        <GoogleAdsTag />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyCallBar />
          <WhatsAppFab />
          <CookieConsent />
        </Providers>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
