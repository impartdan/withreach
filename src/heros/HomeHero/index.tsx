'use client'
import React from 'react'

import type { HomeHeroBlock as HomeHeroBlockType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const HomeHero: React.FC<HomeHeroBlockType> = ({ title, subtitle, links, richText }) => {
  return (
    <div className="relative min-h-dvh pb-lg header-offset text-center flex items-center justify-center">
      <div className="container z-10 relative flex items-center justify-center">
        <div className="max-w-3xl">
          {title && (
            <RevealOnScroll variant="slideUp" delay={0.1}>
              <h1 className="type-display-hero-a text-balance">{title}</h1>
            </RevealOnScroll>
          )}
          {subtitle && (
            <RevealOnScroll variant="slideUp" delay={0.15}>
              <p className="type-display-hero-b text-balance">{subtitle}</p>
            </RevealOnScroll>
          )}
          {richText && (
            <RevealOnScroll variant="fadeIn" delay={0.75}>
              <RichText
                className="wysiwyg text-balance mt-10"
                data={richText}
                enableGutter={false}
              />
            </RevealOnScroll>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 mt-10">
              {links.map(({ link }, i) => (
                <RevealOnScroll key={i} variant="fadeIn" delay={1 + i * 0.05}>
                  <li>
                    <CMSLink {...link} />
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
