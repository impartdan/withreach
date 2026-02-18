import React from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { VideoBlockClient, type VideoBlockClientProps } from './Component.client'

type MediaResource = {
  url?: string | null
  filename?: string | null
  alt?: string | null
  updatedAt?: string | null
}

type Props = {
  videoType?: string | null
  video?: MediaResource | string | null
  youtubeUrl?: string | null
  poster?: MediaResource | string | null
  maxWidth?: string | null
  alignment?: string | null
  disableInnerContainer?: boolean
}

function resolveMediaUrl(resource: MediaResource | string | null | undefined): string | null {
  if (!resource || typeof resource === 'string') return null
  return getMediaUrl(resource.url, resource.updatedAt) || null
}

function resolveMediaAlt(resource: MediaResource | string | null | undefined): string | null {
  if (!resource || typeof resource === 'string') return null
  return resource.alt || null
}

export const VideoBlockComponent: React.FC<Props> = ({
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

  return <VideoBlockClient {...clientProps} />
}
