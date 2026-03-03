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
            aria-expanded={openIndex === index}
            aria-controls={`faq-accordion-panel-${index}`}
            className="flex items-start justify-between w-full text-left gap-4"
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
          {Boolean(item.answer) && (
            <div
              id={`faq-accordion-panel-${index}`}
              className={cn(
                'grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div
                className={cn(
                  'overflow-hidden transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  openIndex === index ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0',
                  answerWrapperClassName,
                )}
              >
                {renderAnswer(item, index)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
