'use client'
import React from 'react'
import type { TrioShortImageCardsBlock as TrioShortImageCardsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { BlockThemeContext } from '@/components/BlockThemeContext'
import { getTrioCardItemClasses } from '@/blocks/trioCardScrollClasses'
import { TrioCardScroller } from '@/blocks/TrioCardScroller'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const TrioShortImageCardsBlock: React.FC<TrioShortImageCardsBlockProps> = ({
  heading,
  links,
  cards,
}) => {
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
                return <CMSLink key={i} {...link} appearance="arrow" size="default" />
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
                      ? 'bg-brand-black text-brand-off-white border border-brand-white/10'
                      : 'bg-brand-white border border-brand-black/20 gap-5'
                  }`,
                )}
              >
                {primaryCardLink && (
                  <CMSLink
                    {...primaryCardLink}
                    appearance="inline"
                    className="absolute inset-0 z-10 opacity-0 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black/40"
                  >
                    <span className="sr-only">{card.title || 'Open card'}</span>
                  </CMSLink>
                )}

                {card.image && typeof card.image !== 'string' && (
                  <div
                    className={`relative overflow-hidden ${
                      isFeaturedCard
                        ? '-mx-5 w-[calc(100%+40px)] flex-1 min-h-[220px]'
                        : 'w-full h-[300px] bg-white'
                    }`}
                  >
                    <Media
                      resource={card.image}
                      imgClassName="object-cover w-full h-full absolute inset-0"
                    />
                  </div>
                )}
                <div
                  className={`flex flex-col gap-4 ${
                    isFeaturedCard ? 'px-6 pt-5 pb-5' : 'py-6 md:p-6'
                  }`}
                >
                  {card.title && (
                    <h3
                      className={
                        isFeaturedCard ? 'type-display-xs text-brand-off-white' : 'type-display-xs'
                      }
                    >
                      {card.title}
                    </h3>
                  )}
                  {card.description && (
                    <RichText
                      className={
                        isFeaturedCard
                          ? 'type-micro text-brand-off-white/80 [&_p]:type-micro [&_p]:text-brand-off-white/80'
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
                          <CMSLink key={i} {...link} appearance="arrow" size="default" />
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
