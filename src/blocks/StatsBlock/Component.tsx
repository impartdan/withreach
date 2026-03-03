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
            <RevealOnScroll key={index} variant="slideUp" delay={index * 0.05}>
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
                  <p className="type-display-md">{stat.value}</p>
                  <p className="type-micro-b">{stat.description}</p>
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
            <RevealOnScroll
              variant="fadeIn"
              className="lg:flex-shrink-0 lg:pr-12 lg:border-r lg:border-[#1E1A15]/20"
            >
              <h2
                className="type-display-sm max-w-[300px] [&_span]:text-brand-olive [&_span]:block"
                dangerouslySetInnerHTML={{ __html: heading }}
              />
            </RevealOnScroll>
          )}

          <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-6 lg:gap-8 w-full lg:pl-12">
            {stats.map((stat, index) => (
              <RevealOnScroll
                key={index}
                variant="slideUp"
                delay={index * 0.05}
                className={`flex flex-col flex-1 gap-2 ${
                  index > 0 ? 'lg:border-l lg:border-[#1E1A15]/20 lg:pl-8' : ''
                }`}
              >
                <div className="type-display-lg">{stat.value}</div>
                <div className="type-micro-b max-w-[180px]">{stat.description}</div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
