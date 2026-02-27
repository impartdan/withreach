'use client'
import React from 'react'

import type { HomeHeroBlock as HomeHeroBlockType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const HomeHero: React.FC<HomeHeroBlockType> = ({ title, subtitle, links, richText }) => {
  return (
    <div className="relative min-h-[100dvh] pb-lg header-offset text-center flex items-center justify-center">
      <div className="container z-10 relative flex items-center justify-center">
        <RevealOnScroll variant="slideUp">
          <div className="max-w-3xl  ">
            {title && <h1 className="type-display-hero-a text-balance">{title}</h1>}
            {subtitle && <p className="type-display-hero-b text-balance">{subtitle}</p>}
            {richText && (
              <RichText
                className="wysiwyg text-balance mt-10"
                data={richText}
                enableGutter={false}
              />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4 mt-10">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}
