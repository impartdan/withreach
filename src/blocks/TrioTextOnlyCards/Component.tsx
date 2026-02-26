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
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16 mb-12 md:mb-16 lg:mb-20">
          <div className="flex flex-col gap-6 flex-1">
            {introduction && (
              <RichText data={introduction} enableGutter={false} enableProse={false} />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map(({ link }, i) => (
                  <CMSLink key={i} size="default" {...link} />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 relative w-full md:w-auto">
            {image && typeof image !== 'string' && <Media resource={image} imgClassName="w-full" />}
          </div>
        </div>
      )}

      {Array.isArray(cards) && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                className={`rounded-[8px] p-8 flex flex-col gap-6 justify-between bg-white border border-border text-brand-black group hover:bg-brand-olive hover:text-white transition-colors duration-300`}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    {card.title && (
                      <span className={`type-display-md text-brand-olive hover:text-white`}>
                        {card.title}
                      </span>
                    )}
                    {card.subtitle && (
                      <span className="text-2xl md:text-3xl font-semibold font-mix leading-[1.2] block">
                        {card.subtitle}
                      </span>
                    )}
                  </div>

                  {card.description && (
                    <RichText
                      className={`type-micro text-brand-black/70 hover:text-white`}
                      data={card.description}
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}
                </div>

                {card.link && (
                  <div>
                    <CMSLink
                      size="clear"
                      {...card.link}
                      label={null}
                      className={` text-brand-black hover:text-white`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </CMSLink>
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
