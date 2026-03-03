'use client'
import React from 'react'
import type { DiagramBlock as DiagramBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { BlockThemeContext } from '@/components/BlockThemeContext'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const DiagramBlock: React.FC<DiagramBlockProps> = ({ heading, content, links, image }) => {
  return (
    <div className="container">
      <div className="bg-brand-off-white rounded-[8px] overflow-hidden px-8 py-12 md:px-16 md:py-16">
        {/* Text Content */}
        <RevealOnScroll variant="fadeIn" className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          {heading && <h2 className="type-display-lg text-brand-black mb-4">{heading}</h2>}

          {content && (
            <RichText
              className="type-intro [&>p]:mb-0"
              data={content}
              enableGutter={false}
              enableProse={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <BlockThemeContext.Provider value="light">
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                {links.map(({ link }, i) => {
                  return <CMSLink key={i} size="default" {...link} />
                })}
              </div>
            </BlockThemeContext.Provider>
          )}
        </RevealOnScroll>

        {/* Diagram Image */}
        {image && typeof image !== 'string' && (
          <RevealOnScroll variant="fadeIn" delay={0.15}>
            <div className="rounded-[8px] overflow-hidden">
              <Media resource={image} imgClassName="w-full h-auto" />
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  )
}
