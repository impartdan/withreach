import React from 'react'
import type { TrioTallImageCardsBlock as TrioTallImageCardsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const TrioTallImageCardsBlock: React.FC<TrioTallImageCardsBlockProps> = ({
  heading,
  links,
  cards,
}) => {
  return (
    <div className="container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
        {heading && (
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black">
            {heading}
          </h2>
        )}

        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap gap-3 shrink-0">
            {links.map(({ link }, i) => {
              return <CMSLink key={i} size="default" {...link} />
            })}
          </div>
        )}
      </div>

      {/* Cards Grid */}
      {Array.isArray(cards) && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-brand-off-white rounded-xl overflow-hidden flex flex-col"
            >
              {card.image && typeof card.image !== 'string' && (
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Media
                    resource={card.image}
                    imgClassName="object-cover w-full h-full absolute inset-0"
                  />
                </div>
              )}
              <div className="p-6 md:p-8 flex flex-col gap-2">
                {card.title && (
                  <h3 className="text-lg md:text-xl font-semibold text-brand-black">
                    {card.title}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
