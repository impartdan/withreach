import React from 'react'

import type { Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { VideoBlockClient, type VideoBlockClientProps } from './Component.client'

type Props = {
  videoType?: string | null
  video?: MediaType | string | null
  youtubeUrl?: string | null
  poster?: MediaType | string | null
  maxWidth?: string | null
  alignment?: string | null
  disableInnerContainer?: boolean
}

function resolveMediaUrl(resource: MediaType | string | null | undefined): string | null {
  if (!resource || typeof resource === 'string') return null
  return getMediaUrl(resource.url, resource.updatedAt) || null
}

function resolveMediaAlt(resource: MediaType | string | null | undefined): string | null {
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
