import React from 'react'
import Link from 'next/link'

import type { Footer as FooterGlobal } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: FooterGlobal = await getCachedGlobal('footer', 1)()

  const navColumns = footerData?.navColumns || []
  const badges = footerData?.badges || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8">
        <nav className="flex w-full flex-col md:flex-row gap-8">
          {navColumns.map((column, columnIndex) => {
            return (
              <div
                key={column.id ?? `column-${columnIndex}`}
                className={`flex flex-col gap-4 ${
                  columnIndex === navColumns.length - 1 ? 'flex-none' : 'flex-1'
                }`}
              >
                {(column?.menus || []).map((menu, menuIndex) => {
                  const items = menu?.items || []
                  if (!items.length) return null

                  return (
                    <div key={menu.id ?? `menu-${menuIndex}`} className="flex flex-col gap-2">
                      {menu.title && (
                        <div className="text-xs font-semibold uppercase text-white/60">
                          {menu.title}
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        {items.map((item, itemIndex) => {
                          const link = item?.link
                          if (!link) return null

                          const isHashLink =
                            typeof link.url === 'string' && link.url.startsWith('#')

                          const key =
                            item.id ??
                            `column-${columnIndex}-menu-${menuIndex}-item-${itemIndex}-${
                              link.url ?? 'link'
                            }`

                          return (
                            <CMSLink
                              className={`text-white ${
                                menu?.variant === 'primary' ? 'text-base md:text-lg' : 'text-sm'
                              }`}
                              appearance={isHashLink ? 'link' : 'inline'}
                              key={key}
                              {...link}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </nav>
      </div>

      <div className="container py-8">
        <div className="flex justify-between items-baseline font-black text-7xl text-white">
          <div>R</div>
          <div>E</div>
          <div>A</div>
          <div>C</div>
          <div>H</div>
        </div>
      </div>
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <ThemeSelector />
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
                  className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
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
