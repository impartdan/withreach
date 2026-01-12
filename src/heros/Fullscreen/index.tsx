'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const FullscreenHero: React.FC<Page['hero']> = ({ links, media, richText, video }) => {
  return (
    <div className="relative flex items-center justify-center bg-brand-black text-white min-h-screen header-offset">
      <div className="container z-10 relative flex items-center justify-center">
        <RevealOnScroll variant="slideUp">
          <div className="max-w-[36.5rem] md:text-center">
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
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
      <RevealOnScroll>
        {video && typeof video === 'object' && video.url ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden opacity-80">
            <video
              autoPlay
              className="absolute inset-0 w-full h-full scale-110 object-cover blur-lg -z-10 "
              loop
              muted
              playsInline
            >
              <source src={video.url} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full overflow-hidden opacity-80">
            {media && typeof media === 'object' && (
              <Media
                fill
                imgClassName="-z-10 object-cover blur-lg scale-110"
                priority
                resource={media}
              />
            )}
          </div>
        )}
      </RevealOnScroll>
    </div>
  )
}
