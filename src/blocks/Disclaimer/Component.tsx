import React from 'react'
import type { DisclaimerBlock as DisclaimerBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const DisclaimerBlock: React.FC<DisclaimerBlockProps> = ({ label, content }) => {
  return (
    <div className="container">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-12">
        {label && <p className="type-body shrink-0 md:w-[200px]">{label}</p>}
        {content && (
          <RichText
            className="type-micro [&>p]:mb-0 flex-1"
            data={content}
            enableGutter={false}
            enableProse={false}
          />
        )}
      </div>
    </div>
  )
}
