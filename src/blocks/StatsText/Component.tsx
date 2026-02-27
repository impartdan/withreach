import React from 'react'
import type { StatsTextBlock as StatsTextBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const StatsTextBlock: React.FC<StatsTextBlockProps> = ({ stats, heading, content }) => {
  return (
    <div className="container">
      <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-start lg:gap-16">
        {/* Stats Grid */}
        {Array.isArray(stats) && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-8 lg:gap-y-16 flex-1">
            {stats.map((stat, index) => (
              <div key={index} className="border-l-2 border-brand-olive/30 pl-6">
                <p className="type-display-lg text-brand-olive">{stat.value}</p>
                <p className="type-micro-b mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Text Content */}
        <div className="flex flex-col gap-6 flex-1">
          {heading && <h2 className="type-display-lg">{heading}</h2>}

          {content && (
            <RichText
              className="text-base md:text-lg text-brand-black leading-[1.5] [&>p]:mb-0"
              data={content}
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
