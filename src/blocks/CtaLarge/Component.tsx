'use client'
import React from 'react'
import type { CtaLargeBlock as CtaLargeBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { cn } from '@/utilities/ui'

const maxWidthClasses: Record<string, string> = {
  'max-w-sm': 'max-w-sm',
  'max-w-md': 'max-w-md',
  'max-w-lg': 'max-w-lg',
  'max-w-xl': 'max-w-xl',
  'max-w-2xl': 'max-w-2xl',
  'max-w-3xl': 'max-w-3xl',
  'max-w-4xl': 'max-w-4xl',
  'max-w-5xl': 'max-w-5xl',
  'max-w-6xl': 'max-w-6xl',
  none: '',
}

export const CtaLargeBlock: React.FC<CtaLargeBlockProps> = ({
  label,
  heading,
  content,
  links,
  maxWidth,
}) => {
  const maxWidthClass = maxWidth ? (maxWidthClasses[maxWidth] ?? 'max-w-3xl') : 'max-w-3xl'

  return (
    <div className="container">
      <RevealOnScroll
        variant="fadeIn"
        className={cn('text-center mx-auto text-pretty', maxWidthClass)}
      >
        {label && <p className=" type-eyebrow  mb-4">{label}</p>}

        {heading && <h2 className="type-display-lg mb-6 text-pretty">{heading}</h2>}

        {content && (
          <RichText
            className="wysiwyg text-pretty mb-8"
            data={content}
            enableGutter={false}
            enableProse={false}
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {links.map(({ link }, i) => {
              return <CMSLink key={i} size="default" {...link} />
            })}
          </div>
        )}
      </RevealOnScroll>
    </div>
  )
}
