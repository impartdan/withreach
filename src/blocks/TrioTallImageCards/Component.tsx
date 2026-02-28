'use client'
import React from 'react'
import type { TrioTallImageCardsBlock as TrioTallImageCardsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { BlockThemeContext } from '@/components/BlockThemeContext'
import { getTrioCardItemClasses } from '@/blocks/trioCardScrollClasses'
import { TrioCardScroller } from '@/blocks/TrioCardScroller'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const TrioTallImageCardsBlock: React.FC<TrioTallImageCardsBlockProps> = ({
  heading,
  links,
  cards,
}) => {
  const isLessThanThreeCards = Array.isArray(cards) && cards.length < 3

  return (
    <div className="container">
      {/* Header */}
      {heading && (
        <RevealOnScroll variant="fadeIn" className="flex flex-col gap-6 mb-10 md:mb-12 lg:mb-20 max-w-2xl">
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
        </RevealOnScroll>
      )}

      {/* Cards Grid */}
      {Array.isArray(cards) && cards.length > 0 && (
        <RevealOnScroll variant="slideUp" delay={0.1}>
        <TrioCardScroller cardCount={cards.length}>
          {cards.map((card, index) => {
            const isFeaturedCard = Boolean(card.markAsFeatured)
            const validCardLinks = Array.isArray(card.links)
              ? card.links
                  .map(({ link }) => link)
                  .filter((link): link is NonNullable<typeof link> => {
                    if (link?.type === 'custom') return Boolean(link.url?.trim())

                    if (link?.type === 'reference') {
                      const referenceValue = link.reference?.value
                      return (
                        typeof referenceValue === 'object' &&
                        referenceValue !== null &&
                        'slug' in referenceValue &&
                        Boolean(referenceValue.slug)
                      )
                    }

                    return false
                  })
              : []

            const primaryCardLink = validCardLinks[0] ?? null
            const visibleCardLinks = validCardLinks.filter((link) => Boolean(link.label?.trim()))

            return (
              <div
                key={index}
                className={getTrioCardItemClasses(
                  `relative rounded-[8px] shadow-sm hover:shadow-xl transition duration-300 p-5 overflow-hidden flex flex-col ${
                    isFeaturedCard
                      ? 'bg-[#c3bfbc]  border border-brand-white/10 flex-col-reverse'
                      : 'bg-brand-white border border-brand-black/20 gap-5'
                  }`,
                )}
              >
                {primaryCardLink && (
                  <CMSLink
                    appearance="inline"
                    className="absolute opacity-0 transition-opacity duration-300 inset-0 z-10 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black/40"
                    {...primaryCardLink}
                  >
                    <span className="sr-only">{card.title || 'Open card'}</span>
                  </CMSLink>
                )}

                {card.image && typeof card.image !== 'string' && (
                  <div
                    className={`relative overflow-hidden ${
                      isFeaturedCard
                        ? '-mx-5 -mb-5 w-[calc(100%+40px)] flex-1 min-h-[220px]'
                        : `bg-white ${isLessThanThreeCards ? 'w-full h-[300px]' : 'aspect-square'}`
                    }`}
                  >
                    <Media
                      resource={card.image}
                      imgClassName={
                        isFeaturedCard
                          ? 'object-cover w-full h-full absolute inset-0'
                          : isLessThanThreeCards
                            ? 'object-cover w-full h-[300px]'
                            : 'object-cover w-full h-full absolute inset-0'
                      }
                    />
                  </div>
                )}
                <div
                  className={`flex flex-col gap-4 ${
                    isFeaturedCard ? 'px-6 pt-5 pb-10' : 'py-6 md:p-6'
                  }`}
                >
                  {card.title && (
                    <h3 className={isFeaturedCard ? 'type-display-sm' : 'type-display-xs'}>
                      {card.title}
                    </h3>
                  )}
                  {card.description && (
                    <RichText
                      className={
                        isFeaturedCard
                          ? 'type-micro  [&_p]:type-micro '
                          : 'type-micro [&_p]:type-micro'
                      }
                      data={card.description}
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}
                  {visibleCardLinks.length > 0 && (
                    <BlockThemeContext.Provider value="light">
                      <div className="relative z-20 mt-auto flex flex-wrap gap-3">
                        {visibleCardLinks.map((link, i) => (
                          <CMSLink key={i} appearance="arrow" size="default" {...link} />
                        ))}
                      </div>
                    </BlockThemeContext.Provider>
                  )}
                </div>
              </div>
            )
          })}
        </TrioCardScroller>
        </RevealOnScroll>
      )}
    </div>
  )
}
