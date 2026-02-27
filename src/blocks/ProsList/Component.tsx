import React from 'react'
import type { ProsListBlock as ProsListBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const ProsListBlock: React.FC<ProsListBlockProps> = ({
  heading,
  prosHeading,
  prosItems,
  solutionText,
}) => {
  return (
    <div className="container">
      {heading && <h2 className="type-display-md text-center mb-10 md:mb-14">{heading}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros Column */}
        <div className="bg-brand-off-white rounded-[8px] p-8 md:p-10">
          {prosHeading && <h3 className="type-display-xs text-brand-olive mb-6">{prosHeading}</h3>}

          {Array.isArray(prosItems) && prosItems.length > 0 && (
            <ul className="space-y-3">
              {prosItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    width="23"
                    height="17"
                    viewBox="0 0 23 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 10.3551L7.46119 16.5L21.7 0.5"
                      stroke="currentCOlor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="text-sm md:text-base text-brand-black">{item.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Solution Column */}
        <div className="bg-white border border-border rounded-[8px] p-8 md:p-10 flex items-center justify-center text-center">
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
