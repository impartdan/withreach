'use client'
import React from 'react'

import type {
  Media as MediaType,
  SolutionsHeroBlock as SolutionsHeroBlockType,
} from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

const bgPositionClasses: Record<string, string> = {
  center: 'bg-center',
  top: 'bg-top',
  bottom: 'bg-bottom',
  left: 'bg-left',
  right: 'bg-right',
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

  return (
    <div className="relative w-full bg-white">
      {/* Top hero area — solid dark background */}
      <div className="relative min-h-[570px] flex items-center justify-center overflow-hidden">
        {bgImage?.url && (
          <div
            className={`absolute inset-0 bg-cover bg-no-repeat z-0 ${bgPositionClass}`}
            style={{ backgroundImage: `url(${bgImage.url})` }}
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none z-[1] backdrop-blur"
          aria-hidden="true"
        />

        {/* Centered text content */}
        <div className="container relative z-10 text-center text-white max-w-[922px] py-20">
          {richText && <RichText className="text-balance" data={richText} enableGutter={false} />}
        </div>
      </div>

      {/* Feature card — overlaps the hero, sits on white bg */}
      {(featureImage || featureContent) && (
        <div className="container relative z-10 -mt-[135px] px-4 md:px-20 pb-20">
          <div className="bg-brand-off-white rounded-2xl overflow-hidden flex flex-col md:flex-row items-center gap-10 md:gap-16 p-10 md:p-20 text-brand-black">
            {featureImage && typeof featureImage === 'object' && (
              <div className="w-full md:w-1/2 flex-shrink-0">
                <Media className="w-full h-auto rounded-lg" resource={featureImage} />
              </div>
            )}

            {featureContent && (
              <div className="w-full md:w-1/2">
                <RichText data={featureContent} enableGutter={false} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
