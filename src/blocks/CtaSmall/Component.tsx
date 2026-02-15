import React from 'react'
import type { CtaSmallBlock as CtaSmallBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CtaSmallBlock: React.FC<CtaSmallBlockProps> = ({ cards }) => {
  return (
    <div className="container">
      {Array.isArray(cards) && cards.length > 0 && (
        <div
          className={`grid gap-6 ${cards.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-brand-off-white rounded-xl p-8 md:p-10 lg:p-12 flex flex-col items-center text-center gap-4"
            >
              {card.heading && (
                <h3 className="text-2xl md:text-3xl font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black">
                  {card.heading}
                </h3>
              )}

              {card.description && (
                <RichText
                  className="text-sm md:text-base text-brand-black/70 leading-[1.5] [&>p]:mb-0"
                  data={card.description}
                  enableGutter={false}
                  enableProse={false}
                />
              )}

              {card.link && (
                <div className="mt-2">
                  <CMSLink size="default" {...card.link} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
