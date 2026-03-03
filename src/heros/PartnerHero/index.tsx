'use client'
import React from 'react'

import type { PartnerHeroBlock as PartnerHeroBlockType } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { Tag } from '@/components/Tag'

export const PartnerHero: React.FC<PartnerHeroBlockType> = ({
  media,
  richText,
  partnerCards,
  blurBackground,
}) => {
  return (
    <div className="relative w-full md:min-h-[536px] header-offset overflow-hidden">
      {/* Background image */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0">
          <Media fill imgClassName="object-cover" priority resource={media} />
          {blurBackground && (
            <>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 backdrop-blur-[17px] bg-white/[0.01]" />
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-16 md:gap-[120px] pt-20 md:pt-20 pb-20 md:pb-[120px]">
        {/* Heading + subtitle */}
        {richText && (
          <RevealOnScroll
            variant="fadeIn"
            className="container text-center text-white max-w-[922px]"
          >
            <RichText data={richText} enableGutter={false} className="space-y-10 text-pretty" />
          </RevealOnScroll>
        )}

        {/* Partner cards */}
        {Array.isArray(partnerCards) && partnerCards.length > 0 && (
          <div className="container flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {partnerCards.map((card, i) => (
              <RevealOnScroll
                key={i}
                variant="slideUpSoft"
                delay={i * 0.06}
                duration={0.72}
                ease={[0.22, 1, 0.36, 1]}
                amount={0.12}
                className="relative bg-white border border-brand-olive/20 rounded-[8px] p-5 w-full md:w-[432px] flex flex-col gap-5 hover:shadow-lg hover:bg-brand-gray-light transition-all group"
              >
                {/* Full-card link overlay */}
                {card.linkUrl && (
                  <Link
                    href={card.linkUrl}
                    className="absolute inset-0 z-0 rounded-[8px]"
                    aria-label={card.title ?? undefined}
                  />
                )}

                {/* Card image */}
                {card.image && typeof card.image === 'object' && (
                  <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden">
                    <Media fill imgClassName="object-cover" resource={card.image} />
                  </div>
                )}

                {/* Card content */}
                <div className="flex flex-col gap-8 px-4 md:px-6 py-5">
                  <div className="flex flex-col gap-2">
                    {/* Badge */}
                    {card.badge && (
                      <Tag label={card.badge} variant="secondary" className="self-start" />
                    )}

                    {/* Title + description */}
                    {card.title && (
                      <h3 className="type-display-sm text-brand-black text-pretty">{card.title}</h3>
                    )}
                    {card.description && (
                      <p className="typt-micro-b text-brand-black text-pretty">{card.description}</p>
                    )}
                  </div>

                  {/* CTA link */}
                  {card.link && card.linkUrl && (
                    <Link
                      href={card.linkUrl}
                      className="relative z-10 inline-flex items-center gap-3 text-brand-black font-semibold text-base group/cta"
                    >
                      {card.link}
                      <svg
                        width="5"
                        height="8"
                        viewBox="0 0 5 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform group-hover/cta:translate-x-1"
                      >
                        <path d="M1 1L4 4L1 7" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </Link>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
