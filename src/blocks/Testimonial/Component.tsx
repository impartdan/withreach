import React from 'react'
import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  media,
  companyLogo,
  quote,
  authorName,
  authorTitle,
  links,
}) => {
  return (
    <div className="container">
      <div className="relative flex flex-col lg:flex-row lg:items-center gap-0">
        {/* Video/Image */}
        {media && typeof media !== 'string' && (
          <div className="relative rounded-xl overflow-hidden lg:w-[60%] aspect-video z-0">
            <Media
              resource={media}
              imgClassName="object-cover w-full h-full absolute inset-0"
            />
          </div>
        )}

        {/* Quote Card */}
        <div className="bg-brand-off-white rounded-xl p-8 md:p-10 lg:p-12 flex flex-col gap-6 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] lg:max-w-[420px] z-10 -mt-8 lg:mt-0 mx-4 lg:mx-0 shadow-sm">
          {companyLogo && typeof companyLogo !== 'string' && (
            <div className="h-6 md:h-8">
              <Media
                resource={companyLogo}
                imgClassName="h-full w-auto object-contain"
              />
            </div>
          )}

          {quote && (
            <blockquote className="text-xl md:text-2xl lg:text-[28px] font-light font-mix leading-[1.3] text-brand-black">
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}

          <div>
            {authorName && (
              <p className="text-sm font-semibold text-brand-black">{authorName}</p>
            )}
            {authorTitle && (
              <p className="text-sm text-brand-black/60">{authorTitle}</p>
            )}
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map(({ link }, i) => {
                return <CMSLink key={i} size="default" {...link} />
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
