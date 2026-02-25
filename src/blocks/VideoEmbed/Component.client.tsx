'use client'

import React, { useState } from 'react'
import NextImage from 'next/image'

export type VideoEmbedClientProps = {
  videoType?: string | null
  videoUrl?: string | null
  youtubeUrl?: string | null
  posterUrl?: string | null
  posterAlt?: string | null
}

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

export const VideoEmbedClient: React.FC<VideoEmbedClientProps> = ({
  videoType,
  videoUrl,
  youtubeUrl,
  posterUrl,
  posterAlt,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [ytThumbIdx, setYtThumbIdx] = useState(0)

  const youtubeId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null

  const ytThumbUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/${YT_THUMB_SIZES[ytThumbIdx]}.jpg`
    : null
  const thumbSrc = posterUrl || ytThumbUrl || null

  const handlePlay = () => setIsPlaying(true)

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
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
          {thumbSrc ? (
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
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}

          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 group-hover:bg-black/70 p-5 transition-colors backdrop-blur-sm">
              <PlayIcon />
            </div>
          </div>
        </button>
      )}
    </div>
  )
}
