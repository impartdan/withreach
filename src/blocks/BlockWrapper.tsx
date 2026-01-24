import React from 'react'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'

type BlockWrapperProps = {
  children: React.ReactNode
  blockSettings?: {
    paddingTop?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
    paddingBottom?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
    backgroundColor?: 'none' | 'primary' | 'secondary' | 'accent' | 'muted' | 'card' | 'background'
    backgroundImage?: number | Media | null
    backgroundImagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right'
    backgroundVideo?: number | Media | null
  }
  className?: string
}

const paddingTopClasses = {
  none: '',
  small: 'pt-8',
  medium: 'pt-16',
  large: 'pt-24',
  xlarge: 'pt-32',
}

const paddingBottomClasses = {
  none: '',
  small: 'pb-8',
  medium: 'pb-16',
  large: 'pb-24',
  xlarge: 'pb-32',
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
  blockSettings,
  className,
}) => {
  const paddingTopClass = blockSettings?.paddingTop
    ? paddingTopClasses[blockSettings.paddingTop]
    : paddingTopClasses.medium

  const paddingBottomClass = blockSettings?.paddingBottom
    ? paddingBottomClasses[blockSettings.paddingBottom]
    : paddingBottomClasses.medium

  const bgColorClass = blockSettings?.backgroundColor
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

  const bgPositionClass = blockSettings?.backgroundImagePosition
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
