import React from 'react'
import type { RichTextBlockType as RichTextBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const RichTextBlockComponent: React.FC<RichTextBlockProps> = ({ content }) => {
  return (
    <div className="container">
      <div className="max-w-3xl mx-auto">
        {content && (
          <RichText
            className="wysiwyg max-w-none text-brand-black [&>h1]:text-3xl [&>h1]:md:text-4xl [&>h1]:font-light [&>h1]:font-mix [&>h1]:mb-6 [&>h1]:mt-12 [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-light [&>h2]:font-mix [&>h2]:mb-4 [&>h2]:mt-10 [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-8 [&>p]:mb-4 [&>p]:leading-[1.6] [&>ul]:mb-4 [&>ol]:mb-4 [&>hr]:my-8 [&>hr]:border-border"
            data={content}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>
    </div>
  )
}
