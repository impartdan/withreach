import React from 'react'
import type { ChecklistBlock as ChecklistBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const ChecklistBlock: React.FC<ChecklistBlockProps> = ({ heading, items }) => {
  return (
    <div className="bg-brand-black">
      <div className="container">
        <div className="py-16 md:py-20">
          {heading && <h2 className="type-display-md text-white mb-10 md:mb-14">{heading}</h2>}

          {Array.isArray(items) && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 [&>*:not(:first-child)]:border-t [&>*]:border-white/10 md:[&>*:nth-child(2)]:border-t-0 md:[&>*:nth-child(n+3)]:pt-6 lg:[&>*:nth-child(3)]:border-t-0 lg:[&>*:nth-child(3)]:pt-0">
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
                  <div className="flex flex-col gap-4">
                    {item.title && <h3 className="type-display-xs text-white">{item.title}</h3>}
                    {item.description && (
                      <RichText
                        className="type-micro-b text-white [&>p]:mb-0"
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
