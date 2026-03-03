'use client'

import React, { useState } from 'react'
import { useBlockTheme } from '@/components/BlockThemeContext'
import { cn } from '@/utilities/ui'

type FaqAccordionItem = {
  question?: string | null
  answer?: unknown
}

type FaqAccordionProps = {
  items?: FaqAccordionItem[] | null
  className?: string
  itemClassName?: string
  questionClassName?: string
  answerWrapperClassName?: string
  renderAnswer: (item: FaqAccordionItem, index: number) => React.ReactNode
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  className,
  itemClassName = 'py-5',
  questionClassName = 'type-display-xs',
  answerWrapperClassName = 'mt-3',
  renderAnswer,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const blockTheme = useBlockTheme()
  const isLightTheme = blockTheme === 'light'

  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index} className={itemClassName}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex items-center justify-between w-full text-left gap-4"
          >
            <span className={questionClassName}>{item.question}</span>
            <span
              className={cn(
                'text-2xl shrink-0 w-8 h-8 flex items-center justify-center rounded-[5px] border bg-transparent transition-colors',
                isLightTheme
                  ? 'text-white/60 border-white/20'
                  : 'text-brand-black/60 border-brand-black/20',
                openIndex !== index && (isLightTheme ? 'bg-[#2D2823] hover:bg-transparent' : ''),
              )}
            >
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          {openIndex === index && item.answer && (
            <div className={answerWrapperClassName}>{renderAnswer(item, index)}</div>
          )}
        </div>
      ))}
    </div>
  )
}
