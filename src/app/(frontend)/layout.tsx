import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { ThirdPartyScripts } from '@/components/ThirdPartyScripts'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { ViewTransitions } from 'next-view-transitions'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { SeasonMix, SeasonSans, SeasonSerif } from './fonts'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <ViewTransitions>
      <html
        className={cn(SeasonSans.variable, SeasonSerif.variable, SeasonMix.variable)}
        lang="en"
        suppressHydrationWarning
      >
        <head>
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        </head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WK6N6RD"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          <Providers>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            <div className="relative" id="vt-main">
              {children}
            </div>
            <Footer />
          </Providers>

          <ThirdPartyScripts />
        </body>
      </html>
    </ViewTransitions>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
