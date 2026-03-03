'use client'
import React from 'react'
import type { FiftyFiftyBlock as FiftyFiftyBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const FiftyFiftyBlock: React.FC<FiftyFiftyBlockProps> = ({
  heading,
  content,
  links,
  image,
  layout = 'textLeft',
}) => {
  const isImageLeft = layout === 'imageLeft'

  return (
    <div className="container">
      <div
        className={`flex flex-col gap-10 lg:gap-16 lg:items-center ${
          isImageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* Text Content */}
        <RevealOnScroll variant="fadeIn" className="  flex-1  text-left">
          <div className="lg:max-w-md mx-auto space-y-6 ">
            {heading && <h2 className="type-display-md text-balance">{heading}</h2>}

            {content && (
              <RichText
                data={content}
                className="text-pretty"
                enableGutter={false}
                enableProse={true}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {links.map(({ link }, i) => {
                  return <CMSLink key={i} size="default" {...link} />
                })}
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* Image */}
        {image && typeof image !== 'string' && (
          <RevealOnScroll variant="slideUp" delay={0.15} className="flex-1">
            <div className="rounded-[8px] overflow-hidden">
              <Media resource={image} imgClassName="w-full h-auto" />
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  )
}
