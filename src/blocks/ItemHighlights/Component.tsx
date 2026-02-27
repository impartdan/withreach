import React from 'react'
import type { ItemHighlightsBlock as ItemHighlightsBlockProps } from '@/payload-types'
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
        <div className={`grid grid-cols-2 ${gridCols} gap-8 md:gap-10`}>
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              {item.icon && typeof item.icon !== 'string' && (
                <div className="relative w-10 h-10">
                  <Media
                    resource={item.icon}
                    pictureClassName="block w-full h-full"
                    imgClassName="object-contain"
                  />
                </div>
              )}
              {item.title && <h3 className="type-display-xs">{item.title}</h3>}
              {item.description && <p className=" type-micro">{item.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
