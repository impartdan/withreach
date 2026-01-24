import type { StatsBlock as StatsBlockProps } from '@/payload-types'
import React from 'react'
import { Media } from '@/components/Media'

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
    <div id={id ? `block-${id}` : undefined}>
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-stone-200/30 to-amber-300/20 backdrop-blur-[40px]" />

      <div className="container relative ">
        {/* Heading */}
        {heading && (
          <h2 className="text-center text-5xl lg:text-6xl font-light text-[#1E1A15] mb-16 lg:mb-20 tracking-tight">
            {heading}
          </h2>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, index) => {
            const icon = typeof stat.icon === 'object' ? stat.icon : null

            return (
              <div
                key={index}
                className="bg-[#1E1A15] rounded-lg p-10 flex flex-col justify-between min-h-[390px] group hover:scale-105 transition-transform duration-300"
              >
                {/* Top content: number and description */}
                <div className="flex flex-col gap-6">
                  <div className="text-7xl lg:text-8xl font-light text-[#FAF7F5] tracking-tight leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xl lg:text-2xl text-white leading-relaxed">
                    {stat.description}
                  </div>
                </div>

                {/* Bottom icon */}
                {icon && (
                  <div className="mt-8 w-16 h-16 flex items-end">
                    <Media resource={icon} imgClassName="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
