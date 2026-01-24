import React from 'react'
import type { TextImageFeatureBlock as TextImageFeatureBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const TextImageFeatureBlock: React.FC<TextImageFeatureBlockProps> = ({
  heading,
  content,
  links,
  images,
  imagePosition = 'right',
  contentAlignment = 'left',
}) => {
  const isImageRight = imagePosition === 'right'

  return (
    <div className="container">
      <div
        className={cn(
          'bg-brand-off-white rounded-xl overflow-hidden p-12 md:p-16 flex flex-col gap-8 lg:gap-12',
          isImageRight ? 'lg:flex-row lg:items-center' : 'lg:flex-row-reverse lg:items-center',
        )}
      >
        {/* Text Content */}
        <div
          className={cn('flex flex-col gap-8 flex-1', {
            'items-start text-left': contentAlignment === 'left',
            'items-center text-center': contentAlignment === 'center',
            'items-end text-right': contentAlignment === 'right',
          })}
        >
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
            <div className="flex flex-wrap gap-3 mt-2">
              {links.map(({ link }, i) => {
                return <CMSLink key={i} size="default" {...link} />
              })}
            </div>
          )}
        </div>

        {/* Images */}
        {Array.isArray(images) && images.length > 0 && (
          <div className="flex gap-0 items-start flex-shrink-0 h-[300px] md:h-[342px]">
            {images.map((item, index) => {
              if (!item.image || typeof item.image === 'string') return null

              return (
                <div
                  key={index}
                  className={cn('relative h-full overflow-hidden', {
                    'rounded-l-lg': index === 0,
                    'rounded-r-lg': index === images.length - 1,
                    'w-full': images.length === 1,
                    'w-[310px]': images.length === 2,
                  })}
                >
                  <Media
                    resource={item.image}
                    imgClassName="object-cover w-full h-full"
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
