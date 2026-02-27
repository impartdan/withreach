import React from 'react'
import type { ImageLeftTextRightBlock as ImageLeftTextRightBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const ImageLeftTextRightBlock: React.FC<ImageLeftTextRightBlockProps> = ({
  heading,
  image,
  items,
}) => {
  return (
    <div className="container">
      <div className="py-16 md:py-20">
        {heading && (
          <h2
            className="type-display-lg max-w-2xl [&_span]:block [&_span]:text-brand-olive  mb-10 md:mb-14"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Image */}
          <div className="relative flex-1 min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden">
            {image && typeof image !== 'string' && (
              <Media resource={image} imgClassName="object-cover w-full h-full" />
            )}
          </div>

          {/* Text Items */}
          <div className="flex-1 flex flex-col gap-8">
            {Array.isArray(items) &&
              items.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  {item.title && <h3 className="type-display-xs text-brand-olive">{item.title}</h3>}
                  {item.description && (
                    <p className="type-micro-b  [&>p]:mb-0">{item.description}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
