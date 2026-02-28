'use client'
import React from 'react'
import type { InsetDualImageBlock as InsetDualImageBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const InsetDualImageBlock: React.FC<InsetDualImageBlockProps> = ({
  heading,
  content,
  links,
  images,
}) => {
  return (
    <div className="container">
      <div className="bg-brand-off-white rounded-[8px] overflow-hidden px-10 py-10 md:px-16 md:py-16 flex flex-col-reverse gap-10 xl:gap-16 xl:flex-row xl:items-start">
        {/* Text Content */}
        <RevealOnScroll variant="fadeIn" className="flex flex-col gap-8 lg:max-w-[445px] shrink-0 items-start text-left">
          {heading && (
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black">
              {heading}
            </h2>
          )}

          {content && (
            <RichText
              className="text-lg md:text-[22px] text-brand-black leading-[1.3] max-w-md [&>p]:mb-0"
              data={content}
              enableGutter={false}
              enableProse={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map(({ link }, i) => {
                return <CMSLink key={i} size="default" {...link} />
              })}
            </div>
          )}
        </RevealOnScroll>

        {/* Dual Images */}
        {Array.isArray(images) && images.length > 0 && (
          <RevealOnScroll variant="slideUp" delay={0.15} className="flex flex-1 flex-row items-stretch h-[280px] md:h-[342px] overflow-hidden rounded-lg">
            {images.slice(0, 2).map((item, index) => {
              if (!item.image || typeof item.image === 'string') return null

              return (
                <div key={index} className="relative w-1/2 flex-shrink-0">
                  <Media
                    resource={item.image}
                    pictureClassName="w-full h-full block"
                    imgClassName="object-cover w-full h-full"
                  />
                </div>
              )
            })}
          </RevealOnScroll>
        )}
      </div>
    </div>
  )
}
