import React from 'react'
import type { ItemHighlightsBlock as ItemHighlightsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const ItemHighlightsBlock: React.FC<ItemHighlightsBlockProps> = ({
  heading,
  columns = '4',
  items,
}) => {
  const gridCols = columns === '3' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'

  return (
    <div className="container">
      {heading && (
        <h2 className="text-3xl md:text-4xl lg:text-[48px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black mb-10 md:mb-12">
          {heading}
        </h2>
      )}

      {Array.isArray(items) && items.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8 md:gap-10`}>
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              {item.icon && typeof item.icon !== 'string' && (
                <div className="w-10 h-10 mb-1">
                  <Media resource={item.icon} imgClassName="w-full h-full object-contain" />
                </div>
              )}
              {item.title && (
                <h3 className="text-base md:text-lg font-semibold text-brand-black">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <RichText
                  className="text-sm text-brand-black/70 leading-[1.5] [&>p]:mb-0"
                  data={item.description}
                  enableGutter={false}
                  enableProse={false}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
