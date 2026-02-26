import React from 'react'
import type { CtaLargeBlock as CtaLargeBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CtaLargeBlock: React.FC<CtaLargeBlockProps> = ({ label, heading, content, links }) => {
  return (
    <div className="container">
      <div className="text-center max-w-3xl mx-auto text-pretty">
        {label && <p className=" type-eyebrow  mb-4">{label}</p>}

        {heading && <h2 className="type-display-lg mb-6">{heading}</h2>}

        {content && (
          <RichText
            className="wysiwyg mb-8"
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
