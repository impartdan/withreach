import React from 'react'
import type { FiftyFiftyBlock as FiftyFiftyBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

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
        <div className="flex flex-col gap-6 flex-1 items-start text-left">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black">
              {heading}
            </h2>
          )}

          {content && (
            <RichText
              className="text-base md:text-lg text-brand-black/70 leading-[1.5] [&>p]:mb-0"
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
          <div className="flex-1">
            <div className="rounded-[8px] overflow-hidden">
              <Media resource={image} imgClassName="w-full h-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
