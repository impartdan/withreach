import React from 'react'
import type { CenterTextBlock as CenterTextBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const CenterTextBlock: React.FC<CenterTextBlockProps> = ({ content }) => {
  return (
    <div className="container">
      <div className="max-w-3xl mx-auto border-l-2 border-border pl-8 md:pl-12">
        {content && (
          <RichText
            className="text-brand-black leading-[1.6] [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-light [&>h2]:font-mix [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:first:mt-0 [&>p]:mb-4 [&>ul]:space-y-2 [&>ul]:mb-6 [&_li]:text-sm [&_li]:md:text-base"
            data={content}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>
    </div>
  )
}
