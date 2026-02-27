'use client'
import React from 'react'

import type { TextHeroBlock as TextHeroBlockType } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const TextHero: React.FC<TextHeroBlockType> = ({ richText, links, logoOne, logoTwo, alignment }) => {
  return (
    <div className="w-full header-offset">
      <div className="container py-20">
        <div className={cn('flex flex-col items-center gap-10 max-w-[908px]', alignment !== 'left' && 'mx-auto')}>
        {/* Optional logos */}
        {(logoOne || logoTwo) && (
          <div className="flex items-center gap-6">
            {logoOne && typeof logoOne === 'object' && (
              <div className="size-20 rounded-[10px] overflow-hidden shadow-[0px_8px_12.6px_rgba(0,0,0,0.04),0px_10px_30px_rgba(0,0,0,0.05),0px_70.6px_56.5px_rgba(0,0,0,0.07)]">
                <Media className="w-full h-full" imgClassName="w-full h-full object-cover" resource={logoOne} />
              </div>
            )}
            {logoOne && logoTwo && <span className="text-brand-black text-2xl">+</span>}
            {logoTwo && typeof logoTwo === 'object' && (
              <div className="size-20 rounded-[10px] overflow-hidden shadow-[0px_8px_12.6px_rgba(0,0,0,0.04),0px_10px_30px_rgba(0,0,0,0.05),0px_70.6px_56.5px_rgba(0,0,0,0.07)]">
                <Media className="w-full h-full" imgClassName="w-full h-full object-cover" resource={logoTwo} />
              </div>
            )}
          </div>
        )}

        {/* Heading + subtitle */}
        {richText && (
          <div className="text-center w-full">
            <RichText data={richText} enableGutter={false} />
          </div>
        )}

        {/* CTA buttons */}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex justify-center gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </div>
  )
}
