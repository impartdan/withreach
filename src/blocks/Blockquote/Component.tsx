import React from 'react'
import type { BlockquoteBlock as BlockquoteBlockProps } from '@/payload-types'

type Props = BlockquoteBlockProps & {
  className?: string
}

export const BlockquoteBlockComponent: React.FC<Props> = ({ quote, citation, className }) => {
  return (
    <blockquote
      className={`border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground${className ? ` ${className}` : ''}`}
    >
      <p className="text-xl leading-relaxed">&ldquo;{quote}&rdquo;</p>
      {citation && (
        <footer className="mt-3 text-sm font-medium not-italic text-foreground">
          &mdash; {citation}
        </footer>
      )}
    </blockquote>
  )
}
