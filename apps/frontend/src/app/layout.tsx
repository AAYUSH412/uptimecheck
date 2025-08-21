import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Appbar } from "../components/Appbar";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export const metadata: Metadata = {
  title: {
    default: "UptimeCheck - Website Monitoring",
    template: "%s | UptimeCheck"
  },
  description: "Monitor your website's uptime and performance with real-time alerts, detailed analytics, and comprehensive reporting.",
  keywords: ["uptime monitoring", "website monitoring", "performance tracking", "site availability", "downtime alerts"],
  authors: [{ name: "UptimeCheck Team" }],
  creator: "UptimeCheck",
  publisher: "UptimeCheck",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://uptimecheck.vercel.app',
    title: 'UptimeCheck - Website Monitoring',
    description: 'Monitor your website\'s uptime and performance with real-time alerts and detailed analytics.',
    siteName: 'UptimeCheck',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UptimeCheck - Website Monitoring Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UptimeCheck - Website Monitoring',
    description: 'Monitor your website\'s uptime and performance with real-time alerts and detailed analytics.',
    images: ['/og-image.png'],
    creator: '@uptimecheck',
  },
  icons: {
    icon: [
      { url: '/square-activity.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://uptimecheck.vercel.app',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider 
          defaultTheme="dark" 
          forcedTheme="dark"
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ClerkProvider>
            <div className="flex min-h-screen flex-col">
              <Appbar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}