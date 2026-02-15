'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const SupportHero: React.FC<Page['hero']> = ({
  richText,
  links,
  media,
}) => {
  return (
    <div className="bg-brand-linen w-full header-offset">
      <div className="container flex flex-col md:flex-row gap-16 md:gap-36 items-start py-20 md:py-[120px]">
        {/* Left column – text content */}
        <div className="w-full md:w-[548px] flex flex-col gap-10 flex-shrink-0">
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
        </div>

        {/* Right column – media/illustration */}
        {media && typeof media === 'object' && (
          <div className="w-full md:flex-1 relative">
            <Media
              className="w-full h-auto mix-blend-color-burn"
              resource={media}
            />
          </div>
        )}
      </div>
    </div>
  )
}
