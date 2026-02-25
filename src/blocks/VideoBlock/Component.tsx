import React from 'react'

import type { Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { VideoBlockClient, type VideoBlockClientProps } from './Component.client'

type Props = {
  title?: string | null
  description?: string | null
  videoType?: string | null
  video?: MediaType | string | number | null
  youtubeUrl?: string | null
  poster?: MediaType | string | number | null
  maxWidth?: string | null
  alignment?: string | null
  disableInnerContainer?: boolean
}

function resolveMediaUrl(resource: MediaType | string | number | null | undefined): string | null {
  if (!resource || typeof resource === 'string' || typeof resource === 'number') return null
  return getMediaUrl(resource.url, resource.updatedAt) || null
}

function resolveMediaAlt(resource: MediaType | string | number | null | undefined): string | null {
  if (!resource || typeof resource === 'string' || typeof resource === 'number') return null
  return resource.alt || null
}

export const VideoBlockComponent: React.FC<Props> = ({
  title,
  description,
  videoType,
  video,
  youtubeUrl,
  poster,
  maxWidth,
  alignment,
}) => {
  const clientProps: VideoBlockClientProps = {
    videoType,
    videoUrl: resolveMediaUrl(video),
    youtubeUrl: youtubeUrl || null,
    posterUrl: resolveMediaUrl(poster),
    posterAlt: resolveMediaAlt(poster),
    maxWidth,
    alignment,
  }

  return (
    <div>
      {(title || description) && (
        <div className="flex flex-col gap-4 mb-4">
          {title && (
            <h3 className="type-display-sm text-brand-black">{title}</h3>
          )}
          {description && (
            <p className="text-lg font-sans font-medium text-brand-black leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      <VideoBlockClient {...clientProps} />
    </div>
  )
}
