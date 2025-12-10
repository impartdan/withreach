import React from 'react'
import Link from 'next/link'

import type { Footer as FooterGlobal } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: FooterGlobal = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const badges = footerData?.badges || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>

        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-4 md:justify-end">
            {badges.map((badge) => {
              if (!badge?.logo) return null

              const key = badge.id ?? `${badge.logo}`
              const logo = badge.logo
              const url = badge.url || '#'

              const logoMedia = typeof logo === 'object' ? logo : undefined

              const BadgeContent = (
                <Media
                  className="h-8 w-auto"
                  imgClassName="h-8 w-auto object-contain"
                  resource={logoMedia ?? logo}
                  alt={logoMedia?.alt || 'Badge logo'}
                />
              )

              if (url) {
                return (
                  <Link
                    key={key}
                    href={url}
                    className="inline-flex items-center"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {BadgeContent}
                  </Link>
                )
              }

              return (
                <div key={key} className="inline-flex items-center">
                  {BadgeContent}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </footer>
  )
}
