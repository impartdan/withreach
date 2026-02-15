import React from 'react'
import type { PageTeaserBlock as PageTeaserBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

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
          <div className="flex flex-col gap-6 flex-1 items-start text-left">
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.15] text-white">
                {heading}
              </h2>
            )}

            {content && (
              <RichText
                className="text-base md:text-lg text-brand-gold leading-[1.5] [&>p]:mb-0"
                data={content}
                enableGutter={false}
                enableProse={false}
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

          {/* Image */}
          {image && typeof image !== 'string' && (
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="max-w-[480px] w-full">
                <Media resource={image} imgClassName="w-full h-auto" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
