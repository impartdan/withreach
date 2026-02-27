'use client'
import React from 'react'
import type { TrioTallImageCardsBlock as TrioTallImageCardsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { BlockThemeContext } from '@/components/BlockThemeContext'
import { getTrioCardItemClasses } from '@/blocks/trioCardScrollClasses'
import { TrioCardScroller } from '@/blocks/TrioCardScroller'

export const TrioTallImageCardsBlock: React.FC<TrioTallImageCardsBlockProps> = ({
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
            className="type-display-lg [&_span]:text-brand-olive [&_span]:block"
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
        <TrioCardScroller cardCount={cards.length}>
          {cards.map((card, index) => (
            <div
              key={index}
              className={getTrioCardItemClasses(
                'bg-brand-white rounded-[8px] shadow-sm hover:shadow-xl transition duration-300 border border-brand-black/20 p-5 gap-5 overflow-hidden flex flex-col',
              )}
            >
              {card.image && typeof card.image !== 'string' && (
                <div className="aspect-square bg-white relative overflow-hidden">
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
                    className="type-micro [&_p]:type-micro"
                    data={card.description}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}
                {Array.isArray(card.links) && card.links.length > 0 && (
                  <BlockThemeContext.Provider value="light">
                    <div className="mt-auto flex flex-wrap gap-3">
                      {card.links.map(({ link }, i) => (
                        <CMSLink key={i} size="default" {...link} />
                      ))}
                    </div>
                  </BlockThemeContext.Provider>
                )}
              </div>
            </div>
          ))}
        </TrioCardScroller>
      )}
    </div>
  )
}
