'use client'
import type { StatsBlock as StatsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import React from 'react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const StatsBlock: React.FC<
  StatsBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, stats } = props

  if (!stats || stats.length === 0) {
    return null
  }

  const hasIcons = stats.some((stat) => stat.icon && typeof stat.icon === 'object')

  if (hasIcons) {
    return (
      <div id={id ? `block-${id}` : undefined} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {stats.map((stat, index) => (
            <RevealOnScroll key={index} variant="slideUp" delay={index * 0.15}>
            <div className="flex flex-col gap-4">
              {stat.icon && typeof stat.icon === 'object' && (
                <div className="h-[42px] w-auto">
                  <Media
                    resource={stat.icon}
                    pictureClassName="h-full w-auto"
                    imgClassName="h-full w-auto object-contain"
                    htmlElement={null}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <p className="text-lg font-sans font-semibold text-brand-black leading-snug">
                  {stat.value}
                </p>
                <p className="text-base font-sans text-brand-black leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div id={id ? `block-${id}` : undefined} className="w-full">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0">
          {heading && (
            <RevealOnScroll variant="fadeIn" className="lg:flex-shrink-0 lg:pr-12 lg:border-r lg:border-[#1E1A15]/20">
              <h2 className="text-3xl lg:text-4xl font-normal text-[#1E1A15] tracking-tight leading-tight max-w-[200px]">
                {heading}
              </h2>
            </RevealOnScroll>
          )}

          <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-6 lg:gap-8 w-full lg:pl-12">
            {stats.map((stat, index) => (
              <RevealOnScroll
                key={index}
                variant="slideUp"
                delay={index * 0.15}
                className={`flex flex-col gap-2 ${
                  index > 0 ? 'lg:border-l lg:border-[#1E1A15]/20 lg:pl-8' : ''
                }`}
              >
                <div className="text-4xl lg:text-5xl font-normal text-[#1E1A15] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-[#1E1A15]/70 leading-snug max-w-[180px]">
                  {stat.description}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
