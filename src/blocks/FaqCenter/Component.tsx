'use client'

import React, { useState } from 'react'
import type { FaqCenterBlock as FaqCenterBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const FaqCenterBlock: React.FC<FaqCenterBlockProps> = ({
  label,
  heading,
  description,
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="bg-brand-black text-white">
      <div className="container">
        <div className="py-16 md:py-20">
          {/* Header */}
          <div className="text-center max-w-5xl mx-auto mb-10 md:mb-14">
            {label && <p className="type-eyebrow mb-3">{label}</p>}
            {heading && (
              <h2
                className="type-display-md mb-4 [&_span]:text-brand-gray"
                dangerouslySetInnerHTML={{ __html: heading }}
              />
            )}
            {description && <p className="type-intro">{description}</p>}
          </div>

          {/* FAQ Items */}
          {Array.isArray(faqs) && faqs.length > 0 && (
            <div className="max-w-3xl mx-auto divide-y divide-white/20">
              {faqs.map((faq, index) => (
                <div key={index} className="py-5">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex items-center justify-between w-full text-left gap-4"
                  >
                    <span className="text-lg md:text-xl text-white font-medium">
                      {faq.question}
                    </span>
                    <span className="text-white/60 text-2xl shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-white/20">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && faq.answer && (
                    <div className="mt-3">
                      <RichText
                        className="text-sm md:text-base text-white/70 leading-[1.6] [&>p]:mb-0"
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
