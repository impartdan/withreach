'use client'
import React from 'react'

import type { HomeHeroBlock as HomeHeroBlockType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const HomeHero: React.FC<HomeHeroBlockType> = ({ links, richText }) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="container z-10 relative flex items-center justify-center">
        <RevealOnScroll variant="slideUp">
          <div className="max-w-3xl md:text-center space-y-6">
            {richText && (
              <RichText className="wysiwyg text-balance" data={richText} enableGutter={false} />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex md:justify-center gap-4">
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
