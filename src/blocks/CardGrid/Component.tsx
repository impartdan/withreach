'use client'
import React from 'react'
import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { BlockThemeContext } from '@/components/BlockThemeContext'
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
              delay={index * 0.15}
              className="bg-white border border-border rounded-[8px] p-8 md:p-10 flex flex-col gap-4"
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
                <BlockThemeContext.Provider value="light">
                  <div className="mt-auto pt-2">
                    <CMSLink size="default" {...card.link} />
                  </div>
                </BlockThemeContext.Provider>
              )}
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  )
}
