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
      <div className={cn('mx-auto', maxWidthClass)}>
        {content && (
          <RichText
            className={cn(
              'wysiwyg max-w-none text-brand-black',
              '[&>h1]:text-3xl [&>h1]:md:text-4xl [&>h1]:font-light [&>h1]:font-mix [&>h1]:mb-6 [&>h1]:mt-12',
              '[&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-light [&>h2]:font-mix [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:first:mt-0',
              '[&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-8',
              '[&>p]:mb-4 [&>p]:leading-[1.6]',
              '[&>ul]:mb-4 [&>ul]:space-y-2 [&>ol]:mb-4',
              '[&_li]:text-sm [&_li]:md:text-base',
              '[&>hr]:my-8 [&>hr]:border-border',
              alignment === 'center' && 'text-center',
            )}
            data={content}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>
    </div>
  )
}
