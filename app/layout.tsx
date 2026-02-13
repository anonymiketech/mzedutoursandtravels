import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CookieConsent } from "@/components/cookie-consent"
import { PromotionalManager } from "@/components/promotional-manager"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "MZEDU TOURS & TRAVELS - Safari Adventures in Kenya",
  description:
    "Experience unforgettable game drives, road trips, and private transport across Kenya. Book your Tsavo adventure today.",
  generator: "anonymiketech MV's",
  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <PromotionalManager />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
