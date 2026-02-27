import React from 'react'
import type { ImageLeftTextRightBlock as ImageLeftTextRightBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const ImageLeftTextRightBlock: React.FC<ImageLeftTextRightBlockProps> = ({
  heading,
  image,
  items,
}) => {
  return (
    <div className="bg-brand-black">
      <div className="container">
        <div className="py-16 md:py-20">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-white mb-10 md:mb-14">
              {heading}
            </h2>
          )}

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Image */}
            {image && typeof image !== 'string' && (
              <div className="relative flex-1 min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Media resource={image} imgClassName="object-cover w-full h-full" />
              </div>
            )}

            {/* Text Items */}
            <div className="flex-1 flex flex-col gap-8">
              {Array.isArray(items) &&
                items.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    {item.title && (
                      <h3 className="text-lg md:text-xl font-light font-mix italic text-brand-olive">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-sm md:text-base text-white/70 leading-[1.6]">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
