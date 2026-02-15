import React from 'react'
import type { SupportIndexBlock as SupportIndexBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const SupportIndexBlock: React.FC<SupportIndexBlockProps> = ({
  heading,
  cards,
  footerContent,
}) => {
  return (
    <div className="container">
      {heading && (
        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black mb-10 md:mb-12">
          {heading}
        </h2>
      )}

      {/* Cards Grid */}
      {Array.isArray(cards) && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-brand-off-white rounded-xl p-6 md:p-8 flex flex-col gap-3"
            >
              {card.title && (
                <h3 className="text-base md:text-lg font-semibold text-brand-black">
                  {card.title}
                </h3>
              )}
              {card.description && (
                <RichText
                  className="text-xs md:text-sm text-brand-black/60 leading-[1.5] [&>p]:mb-0 flex-1"
                  data={card.description}
                  enableGutter={false}
                  enableProse={false}
                />
              )}
              {card.link && (
                <div className="mt-auto pt-2">
                  <CMSLink size="default" {...card.link} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer Content */}
      {footerContent && (
        <div className="border-t border-border pt-8 mt-8">
          <RichText
            className="text-sm text-brand-black/60 leading-[1.6] [&>p]:mb-2"
            data={footerContent}
            enableGutter={false}
            enableProse={false}
          />
        </div>
      )}
    </div>
  )
}
