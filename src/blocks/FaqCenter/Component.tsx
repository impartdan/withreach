'use client'

import React from 'react'
import type { FaqCenterBlock as FaqCenterBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { FaqAccordion } from '@/components/FaqAccordion'

export const FaqCenterBlock: React.FC<FaqCenterBlockProps> = ({
  label,
  heading,
  description,
  faqs,
}) => {
  return (
    <div className="container">
      <div className="py-16 md:py-20">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-10 md:mb-14">
          {label && <p className="type-eyebrow mb-3">{label}</p>}
          {heading && (
            <h2
              className="type-display-md mb-4 [&_span]:text-brand-olive"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          )}
          {description && <p className="type-intro">{description}</p>}
        </div>

        {/* FAQ Items */}
        <FaqAccordion
          items={faqs}
          className="max-w-3xl mx-auto divide-y divide-white/20"
          itemClassName="py-6"
          renderAnswer={(item) =>
            item.answer ? <RichText data={item.answer} enableGutter={false} enableProse={true} /> : null
          }
        />
      </div>
    </div>
  )
}
