'use client'
import React from 'react'
import type { ImageLeftTextRightBlock as ImageLeftTextRightBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const ImageLeftTextRightBlock: React.FC<ImageLeftTextRightBlockProps> = ({
  heading,
  image,
  items,
}) => {
  return (
    <div className="container">
      <div className="py-16 md:py-20">
        {heading && (
          <RevealOnScroll variant="fadeIn">
            <h2
              className="type-display-lg max-w-2xl [&_span]:block [&_span]:text-brand-olive  mb-10 md:mb-14"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          </RevealOnScroll>
        )}

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Image */}
          {image && typeof image !== 'string' && (
            <RevealOnScroll variant="slideUp" className="relative flex-1 min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden">
              <Media resource={image} imgClassName="object-cover w-full h-full" />
            </RevealOnScroll>
          )}

          {/* Text Items */}
          <div className="flex-1 flex flex-col gap-8">
            {Array.isArray(items) &&
              items.map((item, index) => (
                <RevealOnScroll key={index} variant="slideUp" delay={index * 0.15}>
                  <div className="flex flex-col gap-2">
                    {item.title && <h3 className="type-display-xs text-brand-olive">{item.title}</h3>}
                    {item.description && (
                      <p className="type-micro-b  [&>p]:mb-0">{item.description}</p>
                    )}
                  </div>
                </RevealOnScroll>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
