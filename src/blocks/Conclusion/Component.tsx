import React from 'react'
import type { ConclusionBlock as ConclusionBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type Props = ConclusionBlockProps & {
  className?: string
}

export const ConclusionBlockComponent: React.FC<Props> = ({
  heading,
  content,
  stats,
  className,
}) => {
  return (
    <div
      className={`bg-brand-linen rounded-lg p-9 my-8 flex flex-col gap-10${className ? ` ${className}` : ''}`}
    >
      {heading && (
        <h3 className="type-display-sm text-brand-black">{heading}</h3>
      )}

      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-4">
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
                  {stat.title}
                </p>
                {stat.description && (
                  <p className="text-base font-sans text-brand-black leading-relaxed">
                    {stat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {content && (
        <RichText data={content} enableGutter={false} />
      )}
    </div>
  )
}
