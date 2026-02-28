'use client'
import React from 'react'
import type { TextImageFeatureBlock as TextImageFeatureBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { BlockThemeContext } from '@/components/BlockThemeContext'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const TextImageFeatureBlock: React.FC<TextImageFeatureBlockProps> = ({
  heading,
  content,
  links,
  images,
}) => {
  return (
    <div className="container">
      <div className="bg-brand-off-white rounded-[8px] overflow-hidden p-12 md:p-16 flex flex-col gap-8 lg:gap-12 lg:flex-row lg:items-center">
        {/* Text Content */}
        <RevealOnScroll variant="fadeIn" className="flex flex-col gap-8 flex-1 items-start text-left">
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
            <BlockThemeContext.Provider value="light">
              <div className="flex flex-wrap gap-3 mt-2">
                {links.map(({ link }, i) => {
                  return <CMSLink key={i} size="default" {...link} />
                })}
              </div>
            </BlockThemeContext.Provider>
          )}
        </RevealOnScroll>

        {/* Images */}
        {Array.isArray(images) && images.length > 0 && (
          <RevealOnScroll variant="slideUp" delay={0.15} className="flex flex-1 flex-row gap-0 items-stretch flex-shrink-0 w-full aspect-[16/9] overflow-hidden rounded-lg">
            {images.slice(0, 2).map((item, index) => {
              if (!item.image || typeof item.image === 'string') return null

              return (
                <div
                  key={index}
                  className={`relative flex-shrink-0 ${images.length === 1 ? 'w-full' : 'w-1/2'}`}
                >
                  <Media
                    resource={item.image}
                    imgClassName="object-cover w-full h-full absolute inset-0"
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
