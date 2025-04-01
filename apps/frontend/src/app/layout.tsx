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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>UptimeGuard - 24/7 Monitoring for Your Services</title>
        <meta
          name="description"
          content="Monitor your websites, APIs, and services with UptimeGuard. Get instant alerts when issues arise."
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'bg-black-500 hover:bg-slate-400 text-sm',
            },
          }}>
            <Appbar />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}