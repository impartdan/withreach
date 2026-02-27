import React from 'react'
import type { TrioShortImageCardsBlock as TrioShortImageCardsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const TrioShortImageCardsBlock: React.FC<TrioShortImageCardsBlockProps> = ({
  heading,
  links,
  cards,
}) => {
  return (
    <div className="container">
      {/* Header */}
      {heading && (
        <div className="flex flex-col gap-6 mb-10 md:mb-12 lg:mb-20 max-w-2xl">
          <h2
            className="type-display-lg [&_span]:text-brand-olive"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap gap-3 shrink-0">
              {links.map(({ link }, i) => {
                return <CMSLink key={i} size="default" {...link} />
              })}
            </div>
          )}
        </div>
      )}

      {/* Cards Grid */}
      {Array.isArray(cards) && cards.length > 0 && (
        <div
          className={`grid grid-cols-1 gap-6 ${
            cards.length === 1
              ? ''
              : cards.length === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-brand-white/80 rounded-[8px] shadow-sm hover:shadow-xl transition duration-300 border border-brand-black/20 p-5 gap-5 overflow-hidden flex flex-col"
            >
              {card.image && typeof card.image !== 'string' && (
                <div className="w-full h-[300px] bg-white relative overflow-hidden">
                  <Media
                    resource={card.image}
                    imgClassName="object-cover w-full h-full absolute inset-0"
                  />
                </div>
              )}
              <div className=" flex flex-col gap-4 py-6 md:p-6">
                {card.title && <h3 className="type-display-xs">{card.title}</h3>}
                {card.description && (
                  <RichText
                    className="type-micro"
                    data={card.description}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}
                {card.link && (
                  <div className="mt-auto">
                    <CMSLink size="default" url={card.link} label="Learn more" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
