'use client'

import React, { useState } from 'react'
import NextImage from 'next/image'

import { cn } from '@/utilities/ui'

export type VideoBlockClientProps = {
  videoType?: string | null
  videoUrl?: string | null
  youtubeUrl?: string | null
  posterUrl?: string | null
  posterAlt?: string | null
  maxWidth?: string | null
  alignment?: string | null
}

const maxWidthClasses: Record<string, string> = {
  'max-w-3xl': 'max-w-3xl',
  'max-w-4xl': 'max-w-4xl',
  'max-w-5xl': 'max-w-5xl',
  'max-w-6xl': 'max-w-6xl',
  none: '',
}

// YouTube thumbnail sizes tried in order from highest to lowest quality
const YT_THUMB_SIZES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default']

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  )
  return match ? match[1] : null
}

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-16 h-16 text-white drop-shadow-lg"
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const VideoBlockClient: React.FC<VideoBlockClientProps> = ({
  videoType,
  videoUrl,
  youtubeUrl,
  posterUrl,
  posterAlt,
  maxWidth,
  alignment,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [ytThumbIdx, setYtThumbIdx] = useState(0)

  const maxWidthClass = maxWidth ? (maxWidthClasses[maxWidth] ?? 'max-w-4xl') : 'max-w-4xl'
  const isCenter = alignment !== 'left'

  const youtubeId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null

  // Determine which thumbnail to show before playback
  const ytThumbUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/${YT_THUMB_SIZES[ytThumbIdx]}.jpg`
    : null
  const thumbSrc = posterUrl || ytThumbUrl || null

  const handlePlay = () => setIsPlaying(true)

  return (
    <div className="container">
      <div className={cn(maxWidthClass, isCenter && 'mx-auto')}>
        {/* 16:9 aspect ratio wrapper */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          {isPlaying ? (
            <>
              {videoType === 'youtube' && youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  title="YouTube video"
                />
              ) : videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : null}
            </>
          ) : (
            <button
              onClick={handlePlay}
              className="absolute inset-0 w-full h-full group focus:outline-none"
              aria-label="Play video"
            >
              {/* Poster / thumbnail */}
              {thumbSrc ? (
                // Use a plain img for YouTube thumbnails (external domain, unknown dimensions)
                // and NextImage for uploaded posters. Both cases are handled by the ternary below.
                posterUrl ? (
                  <NextImage
                    src={posterUrl}
                    alt={posterAlt || 'Video thumbnail'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbSrc}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={
                      youtubeId && ytThumbIdx < YT_THUMB_SIZES.length - 1
                        ? () => setYtThumbIdx((i) => i + 1)
                        : undefined
                    }
                  />
                )
              )
              ) : (
                <div className="absolute inset-0 bg-neutral-900" />
              )}

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black/50 group-hover:bg-black/70 p-5 transition-colors backdrop-blur-sm">
                  <PlayIcon />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
