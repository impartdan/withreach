import React from 'react'
import type { DisclaimerBlock as DisclaimerBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const DisclaimerBlock: React.FC<DisclaimerBlockProps> = ({ label, content }) => {
  return (
    <div className="bg-brand-off-white">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-6 md:py-8">
          {label && (
            <p className="text-sm font-semibold text-brand-black shrink-0 md:w-[200px]">
              {label}
            </p>
          )}
          {content && (
            <RichText
              className="text-xs md:text-sm text-brand-black/60 leading-[1.6] [&>p]:mb-0 flex-1"
              data={content}
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
