'use client'

import React from 'react'
import type { FaqToCallBlock as FaqToCallBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { FaqAccordion } from '@/components/FaqAccordion'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

const isEditorState = (value: unknown): value is DefaultTypedEditorState => {
  return typeof value === 'object' && value !== null && 'root' in value
}

export const FaqToCallBlock: React.FC<FaqToCallBlockProps> = ({
  heading,
  content,
  image,
  faqs,
}) => {
  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left side: Heading + Description + Image */}
        <div className="flex flex-col gap-8 flex-1">
          {heading && (
            <h2
              className=" type-display-lg [&_span]:text-brand-olive [&_span]:block"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          )}

          {content && (
            <RichText className="wysiwyg" data={content} enableGutter={false} enableProse={true} />
          )}

          {image && typeof image !== 'string' && (
            <div className="max-w-[300px]">
              <Media resource={image} imgClassName="w-full h-auto" />
            </div>
          )}
        </div>

        {/* Right side: FAQ Accordion */}
        <div className="flex-1">
          <FaqAccordion
            items={faqs}
            className="divide-y divide-border"
            renderAnswer={(item) =>
              isEditorState(item.answer) ? (
                <RichText
                  className="wysiwyg type-micro-b"
                  data={item.answer}
                  enableGutter={false}
                  enableProse={false}
                />
              ) : null
            }
          />
        </div>
      </div>
    </div>
  )
}
