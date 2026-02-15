import React from 'react'
import type { CtaLargeBlock as CtaLargeBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CtaLargeBlock: React.FC<CtaLargeBlockProps> = ({
  label,
  heading,
  content,
  links,
}) => {
  return (
    <div className="container">
      <div className="text-center max-w-3xl mx-auto">
        {label && (
          <p className="text-sm font-semibold text-brand-black mb-4">{label}</p>
        )}

        {heading && (
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black mb-6">
            {heading}
          </h2>
        )}

        {content && (
          <RichText
            className="text-base md:text-lg text-brand-black/70 leading-[1.5] [&>p]:mb-0 mb-8"
            data={content}
            enableGutter={false}
            enableProse={false}
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {links.map(({ link }, i) => {
              return <CMSLink key={i} size="default" {...link} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}
