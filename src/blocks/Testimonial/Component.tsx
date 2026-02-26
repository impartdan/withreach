import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { VideoBlockClient } from '@/blocks/VideoBlock/Component.client'
import { getMediaUrl } from '@/utilities/getMediaUrl'

function resolveMediaUrl(resource: MediaType | string | number | null | undefined): string | null {
  if (!resource || typeof resource === 'string' || typeof resource === 'number') return null
  return getMediaUrl(resource.url, resource.updatedAt) || null
}

function resolveMediaAlt(resource: MediaType | string | number | null | undefined): string | null {
  if (!resource || typeof resource === 'string' || typeof resource === 'number') return null
  return resource.alt || null
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  videoType,
  video,
  youtubeUrl,
  poster,
  companyLogo,
  quote,
  authorName,
  authorTitle,
  links,
}) => {
  const hasVideo = (videoType === 'upload' && video) || (videoType === 'youtube' && youtubeUrl)

  return (
    <div className="container">
      <div className="relative flex flex-col lg:flex-row lg:items-start gap-0">
        {/* Video */}
        {hasVideo && (
          <div className="relative rounded-xl overflow-hidden lg:w-[68%] aspect-video z-0">
            <VideoBlockClient
              embedded
              videoType={videoType ?? undefined}
              videoUrl={resolveMediaUrl(video)}
              youtubeUrl={youtubeUrl ?? undefined}
              posterUrl={resolveMediaUrl(poster)}
              posterAlt={resolveMediaAlt(poster)}
            />
          </div>
        )}

        {/* Quote Card */}
        <div className="bg-brand-off-white rounded-xl p-8 md:p-10 lg:p-12 flex flex-col gap-8 lg:absolute lg:right-0 lg:bottom-0 lg:w-[36%] z-10 -mt-8 lg:mt-0 mx-4 lg:mx-0 shadow-sm">
          {companyLogo && typeof companyLogo !== 'string' && (
            <div className="h-6 md:h-8 mb-4">
              <Media resource={companyLogo} imgClassName="h-full w-auto object-contain" />
            </div>
          )}

          {quote && (
            <blockquote className="type-display-sm text-brand-black">
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}

          <div>
            {authorName && <p className="text-base font-semibold text-brand-black">{authorName}</p>}
            {authorTitle && <p className="text-base text-brand-black/60">{authorTitle}</p>}
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
