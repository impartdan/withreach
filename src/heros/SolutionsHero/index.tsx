'use client'
import React from 'react'

import type {
  Media as MediaType,
  SolutionsHeroBlock as SolutionsHeroBlockType,
} from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const bgPositionClasses: Record<string, string> = {
  center: 'bg-center',
  top: 'bg-top',
  bottom: 'bg-bottom',
  left: 'bg-left',
  right: 'bg-right',
}

const objectPositionClasses: Record<string, string> = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
}

export const SolutionsHero: React.FC<SolutionsHeroBlockType> = ({
  richText,
  featureImage,
  featureContent,
  blockSettings,
}) => {
  const bgImage =
    blockSettings?.background === 'image' &&
    typeof blockSettings?.backgroundImage === 'object' &&
    blockSettings.backgroundImage !== null
      ? (blockSettings.backgroundImage as MediaType)
      : null

  const bgPositionClass = blockSettings?.backgroundImagePosition
    ? (bgPositionClasses[blockSettings.backgroundImagePosition] ?? 'bg-center')
    : 'bg-center'
  const objectPositionClass = blockSettings?.backgroundImagePosition
    ? (objectPositionClasses[blockSettings.backgroundImagePosition] ?? 'object-center')
    : 'object-center'
  const bgMediaUrl = getMediaUrl(bgImage?.url, bgImage?.updatedAt)
  const isBackgroundVideo = Boolean(
    bgImage &&
      (bgImage.mimeType?.includes('video') ||
        bgImage.filename?.toLowerCase().endsWith('.mp4') ||
        bgImage.url?.toLowerCase().endsWith('.mp4')),
  )

  return (
    <div className="relative w-full bg-white">
      {/* Top hero area — solid dark background */}
      <div className="relative min-h-[570px] flex items-center justify-center overflow-hidden">
        {bgMediaUrl &&
          (isBackgroundVideo ? (
            <video
              autoPlay
              className={`absolute inset-0 z-0 h-full w-full object-cover ${objectPositionClass}`}
              loop
              muted
              playsInline
              aria-hidden="true"
            >
              <source src={bgMediaUrl} type={bgImage?.mimeType || 'video/mp4'} />
            </video>
          ) : (
            <div
              className={`absolute inset-0 bg-cover bg-no-repeat z-0 ${bgPositionClass}`}
              style={{ backgroundImage: `url(${bgMediaUrl})` }}
              aria-hidden="true"
            />
          ))}
        {blockSettings?.backgroundBlur && (
          <div
            className="absolute inset-0 pointer-events-none z-[1] backdrop-blur-[17px]"
            aria-hidden="true"
          />
        )}

        {/* Centered text content */}
        <RevealOnScroll variant="fadeIn" className="container relative z-10 text-center text-white max-w-[922px] py-20">
          {richText && <RichText className="text-balance" data={richText} enableGutter={false} />}
        </RevealOnScroll>
      </div>

      {/* Feature card — overlaps the hero, sits on white bg */}
      {(featureImage || featureContent) && (
        <RevealOnScroll variant="slideUp" delay={0.2} className="container relative z-10 -mt-[135px] px-4 md:px-20 pb-20">
          <div className="bg-brand-off-white rounded-2xl overflow-hidden flex flex-col md:flex-row items-center gap-10 md:gap-16 p-10 md:p-20 text-brand-black">
            {featureImage && typeof featureImage === 'object' && (
              <div className="w-full md:w-1/2 flex-shrink-0">
                <Media
                  className="relative aspect-square w-full overflow-hidden rounded-lg"
                  fill
                  pictureClassName="h-full w-full"
                  imgClassName="h-full w-full object-cover"
                  videoClassName="h-full w-full object-cover"
                  resource={featureImage}
                />
              </div>
            )}

            {featureContent && (
              <div className="w-full md:w-1/2">
                <RichText data={featureContent} enableGutter={false} />
              </div>
            )}
          </div>
        </RevealOnScroll>
      )}
    </div>
  )
}
