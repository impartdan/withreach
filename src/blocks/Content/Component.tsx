'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

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

export const ContentBlock: React.FC<ContentBlockProps> = ({ content, maxWidth, alignment }) => {
  const maxWidthClass = maxWidth ? (maxWidthClasses[maxWidth] ?? '') : 'max-w-xl'

  return (
    <div className="container">
      <RevealOnScroll variant="fadeIn" className={cn(alignment === 'center' && 'mx-auto', maxWidthClass)}>
        {content && <RichText data={content} enableGutter={false} enableProse={true} />}
      </RevealOnScroll>
    </div>
  )
}
