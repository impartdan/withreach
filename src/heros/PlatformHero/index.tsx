'use client'
import React from 'react'

import type { PlatformHeroBlock as PlatformHeroBlockType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const PlatformHero: React.FC<PlatformHeroBlockType> = ({
  richText,
  links,
  media,
  blockSettings,
}) => {
  const isVideo = media && typeof media === 'object' && media.mimeType?.includes('mp4')
  const showGridLines = blockSettings?.showGridLines !== false

  return (
    <div className="relative w-full overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-gradient-to-br from-brand-linen/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-brand-linen/40 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Fade to white at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[230px] bg-gradient-to-b from-transparent to-white pointer-events-none" />
      {/* Grid lines above gradient fade, below text content */}
      {showGridLines && (
        <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
          <div className="container relative h-full">
            <div className="absolute top-0 left-[17%] w-px h-full bg-brand-black/10" />
            <div className="absolute top-0 left-[33%] w-px h-full bg-brand-black/10" />
            <div className="absolute top-0 right-[17%] w-px h-full bg-brand-black/10" />
          </div>
        </div>
      )}
      <div
        className="container  flex flex-col md:flex-row items-center gap-10 md:gap-16 pb-20 header-offset
      "
      >
        {/* Left column: text content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 relative z-30">
          {richText && <RichText data={richText} enableGutter={false} />}
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

        {/* Right column: illustration (image or video) */}
        {media && typeof media === 'object' && (
          <div className="w-full md:w-1/2 mix-blend-multiply ">
            {isVideo && media.url ? (
              <video autoPlay className="w-full h-auto" loop muted playsInline>
                <source src={media.url} type="video/mp4" />
              </video>
            ) : (
              <Media className="w-full h-auto mix-blend-multiply" resource={media} priority />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
