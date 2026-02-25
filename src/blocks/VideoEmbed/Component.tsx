import React from 'react'

import type { Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { VideoEmbedClient, type VideoEmbedClientProps } from './Component.client'

type Props = {
  title?: string | null
  description?: string | null
  videoType?: string | null
  video?: MediaType | string | number | null
  youtubeUrl?: string | null
  poster?: MediaType | string | number | null
}

function resolveMediaUrl(resource: MediaType | string | number | null | undefined): string | null {
  if (!resource || typeof resource === 'string' || typeof resource === 'number') return null
  return getMediaUrl(resource.url, resource.updatedAt) || null
}

function resolveMediaAlt(resource: MediaType | string | number | null | undefined): string | null {
  if (!resource || typeof resource === 'string' || typeof resource === 'number') return null
  return resource.alt || null
}

export const VideoEmbedComponent: React.FC<Props> = ({
  title,
  description,
  videoType,
  video,
  youtubeUrl,
  poster,
}) => {
  const clientProps: VideoEmbedClientProps = {
    videoType,
    videoUrl: resolveMediaUrl(video),
    youtubeUrl: youtubeUrl || null,
    posterUrl: resolveMediaUrl(poster),
    posterAlt: resolveMediaAlt(poster),
  }

  return (
    <div className="flex flex-col gap-4">
      {(title || description) && (
        <div className="flex flex-col gap-3">
          {title && <h3 className="type-display-sm text-brand-black">{title}</h3>}
          {description && (
            <p className="text-lg font-sans font-medium text-brand-black leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      <VideoEmbedClient {...clientProps} />
    </div>
  )
}
