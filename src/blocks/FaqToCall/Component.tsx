'use client'

import React, { useState } from 'react'
import type { FaqToCallBlock as FaqToCallBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const FaqToCallBlock: React.FC<FaqToCallBlockProps> = ({
  heading,
  content,
  image,
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left side: Heading + Description + Image */}
        <div className="flex flex-col gap-8 lg:max-w-[440px] shrink-0">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black">
              {heading}
            </h2>
          )}

          {content && (
            <RichText
              className="text-base md:text-lg text-brand-black/70 leading-[1.5] [&>p]:mb-0"
              data={content}
              enableGutter={false}
              enableProse={false}
            />
          )}

          {image && typeof image !== 'string' && (
            <div className="max-w-[300px]">
              <Media resource={image} imgClassName="w-full h-auto" />
            </div>
          )}
        </div>

        {/* Right side: FAQ Accordion */}
        <div className="flex-1">
          {Array.isArray(faqs) && faqs.length > 0 && (
            <div className="divide-y divide-border">
              {faqs.map((faq, index) => (
                <div key={index} className="py-5">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex items-center justify-between w-full text-left gap-4"
                  >
                    <span className="text-lg md:text-xl text-brand-black font-medium">
                      {faq.question}
                    </span>
                    <span className="text-brand-black/40 text-2xl shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-border">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && faq.answer && (
                    <div className="mt-3">
                      <RichText
                        className="text-sm md:text-base text-brand-black/70 leading-[1.6] [&>p]:mb-0"
                        data={faq.answer}
                        enableGutter={false}
                        enableProse={false}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
