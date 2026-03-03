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
      <div className="flex flex-col lg:flex-row gap-12  lg:gap-16 items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-6 flex-1 items-start max-w-5xl">
          {heading && <h2 className="type-display-lg ">{heading}</h2>}

          {description && <p className="type-body [&>p]:mb-0">{description}</p>}

          {content && <RichText data={content} enableGutter={false} enableProse={true} />}
        </div>

        {/* Right: Logo/Icon Grid */}
        {Array.isArray(images) && images.length > 0 && (
          <div className="flex-1 flex w-full flex-wrap gap-6 items-center justify-center content-center">
            {images.map((item, index) => {
              if (!item.image || typeof item.image === 'string') return null
              return (
                <div key={index} className="w-full max-w-lg mx-auto">
                  <Media
                    resource={item.image}
                    imgClassName="w-full h-auto rounded-[8px] overflow-hidden"
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
