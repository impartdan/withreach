import React from 'react'
import type { ConclusionBlock as ConclusionBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = ConclusionBlockProps & {
  className?: string
}

export const ConclusionBlockComponent: React.FC<Props> = ({ content, className }) => {
  return (
    <div
      className={`bg-muted rounded-xl px-8 py-6 my-8${className ? ` ${className}` : ''}`}
    >
      <RichText data={content} enableGutter={false} />
    </div>
  )
}
