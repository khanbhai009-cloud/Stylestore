import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StyleStore - Where Every Purchase is a Blessing!",
  description:
    "Discover amazing fashion finds at unbeatable prices. From trendy tops to stylish accessories, find your perfect look and embrace the blessing of great style.",
  keywords: "fashion, clothing, accessories, online shopping, deals, style, trendy, affordable",
  authors: [{ name: "StyleStore" }],
  openGraph: {
    title: "StyleStore - Where Every Purchase is a Blessing!",
    description: "Discover amazing fashion finds at unbeatable prices.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleStore - Where Every Purchase is a Blessing!",
    description: "Discover amazing fashion finds at unbeatable prices.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
