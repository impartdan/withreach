import React from 'react'
import type { TrioTextOnlyCardsBlock as TrioTextOnlyCardsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const TrioTextOnlyCardsBlock: React.FC<TrioTextOnlyCardsBlockProps> = ({
  introduction,
  links,
  image,
  cards,
}) => {
  const hasHeader = introduction || (Array.isArray(links) && links.length > 0) || image

  return (
    <div className="container">
      {hasHeader && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 mb-12 md:mb-16 lg:mb-20">
          <div className="flex flex-col gap-6 flex-1">
            {introduction && (
              <RichText
                data={introduction}
                enableGutter={false}
                enableProse={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map(({ link }, i) => (
                  <CMSLink key={i} size="default" {...link} />
                ))}
              </div>
            )}
          </div>

          {image && typeof image !== 'string' && (
            <div className="flex-1 relative">
              <Media
                resource={image}
                imgClassName="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      {Array.isArray(cards) && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const isDark = card.style === 'dark'

            return (
              <div
                key={index}
                className={`rounded-xl p-8 md:p-10 flex flex-col gap-6 justify-between ${
                  isDark
                    ? 'bg-brand-black text-white'
                    : 'bg-white border border-border text-brand-black'
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    {card.subtitle && (
                      <span
                        className={`text-2xl md:text-3xl font-light font-mix leading-[1.2] block ${isDark ? 'text-brand-olive' : 'text-brand-olive'}`}
                      >
                        {card.subtitle}
                      </span>
                    )}
                    {card.title && (
                      <span className="text-2xl md:text-3xl font-semibold font-mix leading-[1.2] block">
                        {card.title}
                      </span>
                    )}
                  </div>

                  {card.description && (
                    <RichText
                      className={`text-sm md:text-base leading-[1.5] [&>p]:mb-0 ${isDark ? 'text-white/80' : 'text-brand-black/70'}`}
                      data={card.description}
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}
                </div>

                {card.link && (
                  <div>
                    <CMSLink
                      size="default"
                      {...card.link}
                      className={isDark ? 'text-white' : 'text-brand-black'}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
