import React from 'react'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'

import type { SpacingSize } from '@/fields/blockSettings'

type BlockWrapperProps = {
  children: React.ReactNode
  blockType?: string
  blockSettings?: {
    paddingTop?: SpacingSize | null
    paddingBottom?: SpacingSize | null
    backgroundColor?: 'none' | 'primary' | 'secondary' | 'accent' | 'muted' | 'card' | 'background' | null
    backgroundImage?: number | Media | null
    backgroundImagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | null
    backgroundVideo?: number | Media | null
  }
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

const bgColorClasses = {
  none: '',
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

  const bgColorClass =
    blockSettings?.backgroundColor && blockSettings.backgroundColor !== null
      ? bgColorClasses[blockSettings.backgroundColor]
      : ''

  const bgImage =
    typeof blockSettings?.backgroundImage === 'object' && blockSettings?.backgroundImage !== null
      ? blockSettings.backgroundImage
      : null

  const bgVideo =
    typeof blockSettings?.backgroundVideo === 'object' && blockSettings?.backgroundVideo !== null
      ? blockSettings.backgroundVideo
      : null

  const bgPositionClass =
    blockSettings?.backgroundImagePosition && blockSettings.backgroundImagePosition !== null
      ? bgPositionClasses[blockSettings.backgroundImagePosition]
      : bgPositionClasses.center

  return (
    <div
      className={cn(
        'relative',
        paddingTopClass,
        paddingBottomClass,
        bgColorClass,
        bgImage && [bgPositionClass, 'bg-cover', 'bg-no-repeat'],
        className,
      )}
      data-block={blockType}
      style={{
        backgroundImage: bgImage?.url ? `url(${bgImage.url})` : undefined,
      }}
    >
      {bgVideo?.url && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={bgVideo.url} type="video/mp4" />
        </video>
      )}
      {children}
    </div>
  )
}
