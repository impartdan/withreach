'use client'
import React from 'react'

import type { SupportHeroBlock as SupportHeroBlockType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const SupportHero: React.FC<SupportHeroBlockType> = ({
  richText,
  links,
  media,
}) => {
  return (
    <div className="w-full">
      <div className="container flex flex-col md:flex-row gap-16 md:gap-36 items-start py-20 md:py-[120px]">
        {/* Left column – text content */}
        <RevealOnScroll variant="fadeIn" className="w-full md:w-[548px] flex flex-col gap-10 flex-shrink-0">
          {richText && (
            <RichText data={richText} enableGutter={false} />
          )}

          {/* CTA buttons */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </RevealOnScroll>

        {/* Right column – media/illustration */}
        {media && typeof media === 'object' && (
          <RevealOnScroll variant="slideUp" delay={0.15} className="w-full md:flex-1 relative">
            <Media
              className="w-full h-auto mix-blend-color-burn"
              resource={media}
            />
          </RevealOnScroll>
        )}
      </div>
    </div>
  )
}
