'use client'
import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { VideoBlockClient } from '@/blocks/VideoBlock/Component.client'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { BlockThemeContext } from '@/components/BlockThemeContext'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

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
      <div className="relative flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-0 pb-10">
        {/* Video */}
        {hasVideo && (
          <RevealOnScroll variant="slideUp" className="relative rounded-[8px] overflow-hidden lg:w-[68%] aspect-video z-0">
            <VideoBlockClient
              embedded
              videoType={videoType ?? undefined}
              videoUrl={resolveMediaUrl(video)}
              youtubeUrl={youtubeUrl ?? undefined}
              posterUrl={resolveMediaUrl(poster)}
              posterAlt={resolveMediaAlt(poster)}
            />
          </RevealOnScroll>
        )}

        {/* Quote Card */}
        <RevealOnScroll variant="slideUp" delay={0.15} className="bg-brand-off-white w-full md:w-auto rounded-[8px] p-8 md:p-10 lg:p-12 flex flex-col gap-8 -mb-10 pb-10 lg:-translate-x-10 lg:w-[36%] z-10  shadow-sm">
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
            <BlockThemeContext.Provider value="light">
              <div className="flex flex-wrap gap-3">
                {links.map(({ link }, i) => {
                  return <CMSLink key={i} size="default" {...link} />
                })}
              </div>
            </BlockThemeContext.Provider>
          )}
        </RevealOnScroll>
      </div>
    </div>
  )
}
