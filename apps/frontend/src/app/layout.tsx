import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Appbar } from "../components/Appbar";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UptimeCheck - Website Monitoring",
  description: "Monitor your website's uptime and performance",
  icons: {
    icon: [
      { url: '/square-activity.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/square-activity.svg', type: 'image/svg+xml' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          <ClerkProvider>
            <Appbar />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}