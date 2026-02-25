'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'

import type { BackgroundColor, BackgroundType, SpacingSize, TextColor } from '@/fields/blockSettings'
import { BlockThemeContext } from '@/components/BlockThemeContext'

type BlockWrapperProps = {
  children: React.ReactNode
  blockType?: string
  blockSettings?: {
    paddingTop?: SpacingSize | null
    paddingBottom?: SpacingSize | null
    background?: BackgroundType | null
    backgroundColor?: BackgroundColor | null
    backgroundImage?: number | Media | null
    backgroundImagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | null
    backgroundVideo?: number | Media | null
    backgroundVideoUrl?: string | null
    textColor?: TextColor | null
  }
  /** Applied to the root div only when blockSettings produces no active background class */
  fallbackBgClass?: string
  className?: string
}

const paddingTopClasses: Record<SpacingSize, string> = {
  none: '',
  '3xs': 'pt-3xs',
  '2xs': 'pt-2xs',
  xs: 'pt-xs',
  sm: 'pt-sm',
  md: 'pt-md',
  lg: 'pt-lg',
  xl: 'pt-xl',
  '2xl': 'pt-2xl',
}

const paddingBottomClasses: Record<SpacingSize, string> = {
  none: '',
  '3xs': 'pb-3xs',
  '2xs': 'pb-2xs',
  xs: 'pb-xs',
  sm: 'pb-sm',
  md: 'pb-md',
  lg: 'pb-lg',
  xl: 'pb-xl',
  '2xl': 'pb-2xl',
}

const bgColorClasses: Record<BackgroundColor, string> = {
  'brand-off-white': 'bg-brand-off-white',
  'brand-linen': 'bg-brand-linen',
  'brand-black': 'bg-brand-black',
  'brand-white': 'bg-brand-white',
  'brand-olive': 'bg-brand-olive',
  'brand-gray': 'bg-brand-gray',
  'brand-purple': 'bg-brand-purple',
  'brand-peach': 'bg-brand-peach',
  'brand-green': 'bg-brand-green',
  'brand-blue': 'bg-brand-blue',
  'brand-blue-light': 'bg-brand-blue-light',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  muted: 'bg-muted text-muted-foreground',
  card: 'bg-card text-card-foreground',
  background: 'bg-background text-foreground',
}

const bgPositionClasses = {
  center: 'bg-center',
  top: 'bg-top',
  bottom: 'bg-bottom',
  left: 'bg-left',
  right: 'bg-right',
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({
  children,
  blockType,
  blockSettings,
  fallbackBgClass,
  className,
}) => {
  const paddingTopClass =
    blockSettings?.paddingTop && blockSettings.paddingTop !== null
      ? paddingTopClasses[blockSettings.paddingTop]
      : paddingTopClasses.md

  const paddingBottomClass =
    blockSettings?.paddingBottom && blockSettings.paddingBottom !== null
      ? paddingBottomClasses[blockSettings.paddingBottom]
      : paddingBottomClasses.md

  const bgType = blockSettings?.background ?? 'none'

  const bgColorClass =
    bgType !== 'none' && blockSettings?.backgroundColor
      ? bgColorClasses[blockSettings.backgroundColor]
      : ''

  const bgImage =
    (bgType === 'image' || bgType === 'video') &&
    typeof blockSettings?.backgroundImage === 'object' &&
    blockSettings.backgroundImage !== null
      ? blockSettings.backgroundImage
      : null

  const bgPositionClass =
    blockSettings?.backgroundImagePosition
      ? bgPositionClasses[blockSettings.backgroundImagePosition]
      : bgPositionClasses.center

  const bgVideoFile =
    bgType === 'video' &&
    typeof blockSettings?.backgroundVideo === 'object' &&
    blockSettings.backgroundVideo !== null
      ? blockSettings.backgroundVideo
      : null

  const bgVideoUrl =
    bgType === 'video' && !bgVideoFile && blockSettings?.backgroundVideoUrl
      ? blockSettings.backgroundVideoUrl
      : null

  const videoSrc = bgVideoFile?.url ?? bgVideoUrl

  const theme = blockSettings?.textColor === 'light' ? 'light' : 'dark'
  const textColorClass = theme === 'light' ? 'text-white' : 'text-brand-black'

  return (
    <div
      className={cn('relative', paddingTopClass, paddingBottomClass, bgColorClass || fallbackBgClass, className)}
      data-block={blockType}
    >
      {/* z-0: image layer — sits above the background color */}
      {bgImage?.url && (
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-no-repeat z-0',
            bgPositionClass,
          )}
          style={{ backgroundImage: `url(${bgImage.url})` }}
        />
      )}
      {/* z-10: video layer — sits above the image */}
      {videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {/* z-[15]: blur overlay — applied over any video background */}
      {videoSrc && (
        <div className="absolute inset-0 z-[15] backdrop-blur-[17px] bg-[rgba(255,255,255,0.01)]" />
      )}
      {/* z-20: content — always on top */}
      <BlockThemeContext.Provider value={theme}>
        <div className={cn('relative z-20', textColorClass)}>{children}</div>
      </BlockThemeContext.Provider>
    </div>
  )
}
