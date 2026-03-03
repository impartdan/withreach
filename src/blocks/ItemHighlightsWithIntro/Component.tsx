'use client'
import React from 'react'
import type { ItemHighlightsWithIntroBlock as ItemHighlightsWithIntroBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const ItemHighlightsWithIntroBlock: React.FC<ItemHighlightsWithIntroBlockProps> = ({
  heading,
  description,
  items,
}) => {
  const itemCount = Array.isArray(items) ? items.length : 0
  const gridClassName = `grid grid-cols-1 gap-10 md:gap-12 ${
    itemCount === 1
      ? 'max-w-xl mx-auto md:grid-cols-1 lg:grid-cols-1'
      : itemCount === 2
        ? 'max-w-4xl mx-auto md:grid-cols-2 lg:grid-cols-2'
        : 'md:grid-cols-2 lg:grid-cols-3'
  }`

  return (
    <div className="container">
      {/* Header */}
      <RevealOnScroll variant="fadeIn" className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        {heading && (
          <h2
            className="type-display-lg mb-4 [&_span]:text-brand-olive [&_span]:block"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        )}
        {description && <p className="type-intro ">{description}</p>}
      </RevealOnScroll>

      {/* Items Grid */}
      {Array.isArray(items) && items.length > 0 && (
        <div className={gridClassName}>
          {items.map((item, index) => (
            <RevealOnScroll
              key={index}
              variant="slideUp"
              delay={index * 0.05}
              className="flex flex-col gap-4"
            >
              {item.icon && typeof item.icon !== 'string' && (
                <div className="w-10 h-10 mb-1">
                  <Media resource={item.icon} imgClassName="w-full h-full object-contain" />
                </div>
              )}
              {item.title && <h3 className="type-eyebrow">{item.title}</h3>}
              {item.description && (
                <RichText
                  className="type-micro"
                  data={item.description}
                  enableGutter={false}
                  enableProse={false}
                />
              )}
              {item.link && (
                <div className="mt-auto pt-2">
                  <CMSLink appearance="inline" {...item.link} label={null} className="inline-flex">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="sr-only">{item.link.label || 'Open link'}</span>
                  </CMSLink>
                </div>
              )}
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  )
}
