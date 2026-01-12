import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const TextAndImageHero: React.FC<Page['hero']> = ({ media, rightText }) => {
  return (
    <div className="container">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          {media && typeof media === 'object' && (
            <Media imgClassName="rounded-lg" priority resource={media} />
          )}
        </div>
        <div className="order-1 md:order-2">
          {rightText && <RichText data={rightText} enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
