import React from 'react'
import type { ConsListBlock as ConsListBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const ConsListBlock: React.FC<ConsListBlockProps> = ({
  heading,
  consHeading,
  consItems,
  solutionText,
}) => {
  return (
    <div className="container">
      {heading && <h2 className="type-display-md text-center mb-10 md:mb-14">{heading}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cons Column */}
        <div className="bg-brand-off-white rounded-xl p-8 md:p-10">
          {consHeading && <h3 className="type-display-xs text-brand-olive mb-6">{consHeading}</h3>}

          {Array.isArray(consItems) && consItems.length > 0 && (
            <ul className="space-y-3">
              {consItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 text-brand-black/40 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm md:text-base text-brand-black">{item.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Solution Column */}
        <div className="bg-white border border-border rounded-xl p-8 md:p-10 flex items-center justify-center text-center">
          {solutionText && (
            <RichText
              className="type-display-sm [&>p]:mb-0"
              data={solutionText}
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
