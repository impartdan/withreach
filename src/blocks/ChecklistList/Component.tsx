import React from 'react'
import type { ChecklistListBlock as ChecklistListBlockProps } from '@/payload-types'

export const ChecklistListComponent: React.FC<ChecklistListBlockProps> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <ul role="list" className="flex flex-col gap-2 not-prose">
      {items.map((item, index) => (
        <li key={index} className="flex gap-4">
          <svg
            className="w-5 h-5 mt-[0.25em] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <div>{item.text}</div>
        </li>
      ))}
    </ul>
  )
}
