import type { StatsBlock as StatsBlockProps } from '@/payload-types'
import React from 'react'

export const StatsBlock: React.FC<
  StatsBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, stats } = props

  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <div id={id ? `block-${id}` : undefined} className="w-full">
      <div className="container">
        {/* Horizontal layout with heading and stats */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0">
          {/* Heading */}
          {heading && (
            <div className="lg:flex-shrink-0 lg:pr-12 lg:border-r lg:border-[#1E1A15]/20">
              <h2 className="text-3xl lg:text-4xl font-normal text-[#1E1A15] tracking-tight leading-tight max-w-[200px]">
                {heading}
              </h2>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-6 lg:gap-8 w-full lg:pl-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 ${
                  index > 0 ? 'lg:border-l lg:border-[#1E1A15]/20 lg:pl-8' : ''
                }`}
              >
                {/* Stat Value */}
                <div className="text-4xl lg:text-5xl font-normal text-[#1E1A15] tracking-tight">
                  {stat.value}
                </div>
                {/* Stat Description */}
                <div className="text-sm lg:text-base text-[#1E1A15]/70 leading-snug max-w-[180px]">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
