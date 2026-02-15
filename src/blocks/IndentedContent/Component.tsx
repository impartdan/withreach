import React from 'react'
import type { IndentedContentBlock as IndentedContentBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const IndentedContentBlock: React.FC<IndentedContentBlockProps> = ({
  heading,
  description,
  content,
  images,
}) => {
  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-6 flex-1 items-start">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black">
              {heading}
            </h2>
          )}

          {description && (
            <p className="text-base md:text-lg text-brand-black/70 leading-[1.5]">
              {description}
            </p>
          )}

          {content && (
            <RichText
              className="text-base text-brand-black leading-[1.6] [&>ul]:list-none [&>ul]:space-y-2 [&_li]:flex [&_li]:gap-2 [&_li]:items-start"
              data={content}
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>

        {/* Right: Logo/Icon Grid */}
        {Array.isArray(images) && images.length > 0 && (
          <div className="flex-1 flex flex-wrap gap-6 items-center justify-center content-center">
            {images.map((item, index) => {
              if (!item.image || typeof item.image === 'string') return null
              return (
                <div key={index} className="w-16 h-16 md:w-20 md:h-20">
                  <Media
                    resource={item.image}
                    imgClassName="w-full h-full object-contain"
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
