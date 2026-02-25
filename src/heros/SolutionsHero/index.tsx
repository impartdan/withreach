'use client'
import React from 'react'

import type { SolutionsHeroBlock as SolutionsHeroBlockType } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const SolutionsHero: React.FC<SolutionsHeroBlockType> = ({
  media,
  richText,
  featureImage,
  featureContent,
}) => {
  return (
    <div className="relative w-full">
      {/* Top hero area with background image */}
      <div className="relative min-h-[570px] flex items-center justify-center overflow-hidden">
        {/* Background image with blur + overlay */}
        {media && typeof media === 'object' && (
          <div className="absolute inset-0">
            <Media
              fill
              imgClassName="object-cover"
              priority
              resource={media}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 backdrop-blur-[17px] bg-white/[0.01]" />
          </div>
        )}

        {/* Centered text content */}
        <div className="container relative z-10 text-center text-white max-w-[922px] py-20">
          {richText && (
            <RichText className="text-balance" data={richText} enableGutter={false} />
          )}
        </div>
      </div>

      {/* Feature card overlapping the hero */}
      {(featureImage || featureContent) && (
        <div className="container relative -mt-[135px] z-10 px-4 md:px-20">
          <div className="bg-brand-offwhite rounded-2xl overflow-hidden flex flex-col md:flex-row items-center gap-10 md:gap-16 p-10 md:p-20">
            {/* Feature image */}
            {featureImage && typeof featureImage === 'object' && (
              <div className="w-full md:w-1/2 flex-shrink-0">
                <Media
                  className="w-full h-auto rounded-lg"
                  resource={featureImage}
                />
              </div>
            )}

            {/* Feature text */}
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
