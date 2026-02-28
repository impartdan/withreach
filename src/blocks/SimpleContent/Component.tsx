'use client'
import React from 'react'
import type { SimpleContentBlock as SimpleContentBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const SimpleContentBlock: React.FC<SimpleContentBlockProps> = ({
  heading,
  items,
  images,
}) => {
  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: Heading + Steps */}
        <RevealOnScroll variant="fadeIn" className="flex-1">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black mb-10 md:mb-12">
              {heading}
            </h2>
          )}

          {Array.isArray(items) && items.length > 0 && (
            <div className="flex flex-col divide-y divide-border">
              {items.map((item, index) => (
                <div key={index} className="py-6 first:pt-0">
                  {item.title && (
                    <h3 className="text-base md:text-lg font-semibold text-brand-black mb-2">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <RichText
                      className="text-sm md:text-base text-brand-black/70 leading-[1.5] [&>p]:mb-0"
                      data={item.description}
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </RevealOnScroll>

        {/* Right: Images */}
        {Array.isArray(images) && images.length > 0 && (
          <RevealOnScroll variant="slideUp" delay={0.15} className="relative flex-1 min-h-[300px] md:min-h-[400px]">
            {images.map((item, index) => {
              if (!item.image || typeof item.image === 'string') return null

              const positionClasses = [
                'top-0 left-0 w-[55%] z-10',
                'top-[10%] right-0 w-[60%] z-20',
                'bottom-0 left-[15%] w-[50%] z-30',
              ]

              return (
                <div
                  key={index}
                  className={`absolute rounded-lg overflow-hidden shadow-lg ${positionClasses[index] || ''}`}
                >
                  <Media
                    resource={item.image}
                    imgClassName="object-cover w-full h-full"
                  />
                </div>
              )
            })}
          </RevealOnScroll>
        )}
      </div>
    </div>
  )
}
