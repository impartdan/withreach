import React from 'react'
import type { ChecklistBlock as ChecklistBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const ChecklistBlock: React.FC<ChecklistBlockProps> = ({ heading, items }) => {
  return (
    <div className="bg-brand-black">
      <div className="container">
        <div className="py-16 md:py-20">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-white mb-10 md:mb-14">
              {heading}
            </h2>
          )}

          {Array.isArray(items) && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 divide-y md:divide-y-0 divide-white/10">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 pt-6 md:pt-0">
                  <svg
                    className="w-5 h-5 mt-0.5 text-white/60 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <div className="flex flex-col gap-2">
                    {item.title && (
                      <h3 className="text-base md:text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <RichText
                        className="text-sm text-white/60 leading-[1.5] [&>p]:mb-0"
                        data={item.description}
                        enableGutter={false}
                        enableProse={false}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
