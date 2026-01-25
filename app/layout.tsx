import React from "react"
/**
 * ============================================================================
 * BERIT - ALIANÇA SAGRADA | Root Layout
 * ============================================================================
 * 
 * TYPOGRAPHY SETUP:
 * - Inter: Interface elements (font-sans)
 * - Merriweather: Biblical/Scripture text (font-serif)
 * 
 * TAILWIND CLASSES:
 * - font-sans: Aplica Inter para UI
 * - font-serif: Aplica Merriweather para escrituras
 * - bg-berit-black: Fundo #000000 no html para iOS Safari
 * - berit-grain: Overlay de ruído sutil
 * 
 * MAINTENANCE:
 * - viewport.maximumScale=1 previne zoom em inputs iOS
 * - html className inclui bg para evitar flash branco
 * ============================================================================
 */

import type { Metadata, Viewport } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Berit | Aliança Sagrada',
  description: 'Sistema de estudo bíblico e filosófico - Um Templo Digital para contemplação das escrituras.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${merriweather.variable} bg-black`}>
      <body className="font-sans antialiased berit-grain min-h-screen">
        <ClerkProvider>
          {children}
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  )
}
