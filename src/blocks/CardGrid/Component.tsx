'use client'
import React from 'react'
import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const CardGridBlock: React.FC<CardGridBlockProps> = ({ title, cards }) => {
  return (
    <div className="container">
      {title && (
        <RevealOnScroll variant="fadeIn">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black mb-10 md:mb-12">
            {title}
          </h2>
        </RevealOnScroll>
      )}

      {Array.isArray(cards) && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <RevealOnScroll
              key={index}
              variant="slideUp"
              delay={index * 0.05}
              className={`bg-white border border-border rounded-[8px] p-8 md:p-10 flex flex-col gap-4 relative ${card.link ? 'group/card' : ''}`}
            >
              <div className="flex flex-col gap-4 flex-1">
                {card.title && (
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-black leading-[1.2]">
                    {card.title}
                  </h3>
                )}
                {card.description && (
                  <RichText
                    className="text-sm md:text-base text-brand-black/70 leading-[1.6] [&>p]:mb-0 flex-1"
                    data={card.description}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}
              </div>
              {card.link && (
                <>
                  <div className="mt-auto pt-2 text-sm md:text-base text-brand-black inline-flex items-center gap-2">
                    <span>{card.link.label || 'Learn more'}</span>
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/card:translate-x-0.5"
                    >
                      <path
                        d="M0.75 8.75L4.89286 4.75L0.75 0.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <CMSLink {...card.link} label={null} className="absolute inset-0 z-10 rounded-[8px]">
                    <span className="sr-only">{card.link.label || card.title || 'Open card link'}</span>
                  </CMSLink>
                </>
              )}
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  )
}
