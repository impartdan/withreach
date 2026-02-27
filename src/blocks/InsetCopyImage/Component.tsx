import React from 'react'
import type { InsetCopyImageBlock as InsetCopyImageBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const InsetCopyImageBlock: React.FC<InsetCopyImageBlockProps> = ({
  heading,
  content,
  links,
  images,
}) => {
  return (
    <div className="container">
      <div className="bg-brand-off-white rounded-[8px] overflow-hidden px-10 py-10 md:px-16 md:py-16 flex flex-col gap-10 lg:gap-16 lg:flex-row lg:items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-8 lg:max-w-[480px] shrink-0 items-start text-left">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black">
              {heading}
            </h2>
          )}

          {content && (
            <RichText
              className="text-base md:text-lg text-brand-black leading-[1.5] [&>p]:mb-0"
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
        </div>

        {/* Image Collage */}
        {Array.isArray(images) && images.length > 0 && (
          <div className="relative flex-1 min-h-[300px] md:min-h-[400px]">
            {images.map((item, index) => {
              if (!item.image || typeof item.image === 'string') return null

              return (
                <div key={index} className="w-full max-w-lg mx-auto">
                  <Media
                    resource={item.image}
                    imgClassName="w-full h-auto rounded-lg overflow-hidden"
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
