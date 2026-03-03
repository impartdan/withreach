import React from 'react'
import type { BlockquoteBlock as BlockquoteBlockProps } from '@/payload-types'

type Props = BlockquoteBlockProps & {
  className?: string
}

export const BlockquoteBlockComponent: React.FC<Props> = ({ quote, citation, className }) => {
  return (
    <blockquote
      className={`border-l relative border-brand-gray-light pl-8 py-4 flex gap-1 items-start not-italic${className ? ` ${className}` : ''}`}
    >
      <span className=" type-display-sm absolute left-4 top-4 text-brand-black shrink-0 not-italic">
        &ldquo;
      </span>
      <div className="flex flex-col gap-4 min-w-0">
        <p className="type-display-sm text-brand-black whitespace-pre-wrap">{quote}&rdquo;</p>
        {citation && <p className="type-micro text-brand-black">&mdash; {citation}</p>}
      </div>
    </blockquote>
  )
}
