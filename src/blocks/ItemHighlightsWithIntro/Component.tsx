import React from 'react'
import type { ItemHighlightsWithIntroBlock as ItemHighlightsWithIntroBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const ItemHighlightsWithIntroBlock: React.FC<ItemHighlightsWithIntroBlockProps> = ({
  heading,
  description,
  items,
}) => {
  return (
    <div className="bg-brand-black">
      <div className="container">
        <div className="py-16 md:py-20">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-white mb-4">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-base md:text-lg text-white/70 leading-[1.5]">{description}</p>
            )}
          </div>

          {/* Items Grid */}
          {Array.isArray(items) && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
                  {item.icon && typeof item.icon !== 'string' && (
                    <div className="w-10 h-10 mb-1">
                      <Media resource={item.icon} imgClassName="w-full h-full object-contain" />
                    </div>
                  )}
                  {item.title && (
                    <h3 className="text-base md:text-lg font-semibold text-brand-olive">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <RichText
                      className="text-sm text-white/60 leading-[1.5] [&>p]:mb-0"
                      data={item.description}
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}
                  {item.link && (
                    <div className="mt-auto pt-2">
                      <CMSLink size="default" {...item.link} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
