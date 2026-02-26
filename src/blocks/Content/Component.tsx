import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

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
      <div className={cn(alignment === 'center' && 'mx-auto', maxWidthClass)}>
        {content && <RichText data={content} enableGutter={false} enableProse={true} />}
      </div>
    </div>
  )
}
