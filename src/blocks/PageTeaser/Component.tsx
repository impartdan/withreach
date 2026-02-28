'use client'
import React from 'react'
import type { PageTeaserBlock as PageTeaserBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const PageTeaserBlock: React.FC<PageTeaserBlockProps> = ({
  heading,
  content,
  links,
  image,
}) => {
  return (
    <div className="bg-brand-black">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 py-16 md:py-20">
          {/* Text Content */}
          <RevealOnScroll variant="fadeIn" className="flex flex-col gap-6 flex-1 items-start text-left">
            {(heading || content) && (
              <div>
                {heading && <h2 className="type-display-md text-white">{heading}</h2>}
                {content && <p className="type-display-md text-brand-olive">{content}</p>}
              </div>
            )}
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {links.map(({ link }, i) => {
                  return <CMSLink key={i} size="default" {...link} />
                })}
              </div>
            )}
          </RevealOnScroll>

          {/* Image */}
          {image && typeof image !== 'string' && (
            <RevealOnScroll variant="slideUp" delay={0.15} className="flex-1 flex justify-center lg:justify-end">
              <div className="max-w-[480px] w-full">
                <Media resource={image} imgClassName="w-full h-auto" />
              </div>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </div>
  )
}
