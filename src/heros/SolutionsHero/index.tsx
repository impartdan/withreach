'use client'
import React from 'react'

import type { SolutionsHeroBlock as SolutionsHeroBlockType } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const SolutionsHero: React.FC<SolutionsHeroBlockType> = ({
  richText,
  featureImage,
  featureContent,
}) => {
  return (
    <div className="relative w-full bg-white">
      {/* Top hero area — solid dark background */}
      <div className="relative min-h-[570px] flex items-center justify-center overflow-hidden bg-brand-black">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 30% 60%, rgba(42,36,28,0.9) 0%, #1E1A15 70%)',
          }}
        />

        {/* Centered text content */}
        <div className="container relative z-10 text-center text-white max-w-[922px] py-20">
          {richText && (
            <RichText className="text-balance" data={richText} enableGutter={false} />
          )}
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
