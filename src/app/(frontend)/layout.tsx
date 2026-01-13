import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'
import Script from 'next/script'

import { AdminBar } from '@/components/AdminBar'
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
  const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID

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
          <Providers>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            <div id="vt-main">{children}</div>
            <Footer />
          </Providers>

          {/* HubSpot Tracking Code - tracks page views across all pages for journey analytics */}
          {hubspotPortalId && (
            <Script
              id="hs-script-loader"
              strategy="afterInteractive"
              src={`//js.hs-scripts.com/${hubspotPortalId}.js`}
            />
          )}
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
