import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Appbar } from "../components/Appbar";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A0A0F" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://uptimecheck.vercel.app"),
  title: {
    default: "UptimeCheck — Know When Your Site Goes Down",
    template: "%s | UptimeCheck",
  },
  description:
    "UptimeCheck monitors your websites and APIs from global locations. Get alerted in under 60 seconds when something breaks. Free to start.",
  keywords: [
    "uptime monitoring",
    "website monitoring",
    "API monitoring",
    "downtime alerts",
    "performance tracking",
    "site availability",
    "real-time monitoring",
    "open source monitoring",
  ],
  authors: [{ name: "Aayush Vaghela", url: "https://aayush-vaghela.vercel.app" }],
  creator: "Aayush Vaghela",
  publisher: "UptimeCheck",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uptimecheck.vercel.app",
    title: "UptimeCheck — Know When Your Site Goes Down",
    description:
      "Monitor websites and APIs from global locations.",
    siteName: "UptimeCheck",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UptimeCheck — Real-time Website Monitoring Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UptimeCheck — Know When Your Site Goes Down",
    description:
      "Monitor websites and APIs from global locations.",
    images: ["/og-image.png"],
    creator: "@aayush_vaghela",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  alternates: {
    canonical: "https://uptimecheck.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          defaultTheme="dark"
          forcedTheme="dark"
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ClerkProvider>
            <div className="flex min-h-screen flex-col bg-[#0A0A0F]">
              <Appbar />
              <main className="flex-1">{children}</main>
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}