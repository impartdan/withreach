import React from 'react'

import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type Props = {
  image?: MediaType | string | null
  maxWidth?: string | null
  alignment?: string | null
  disableInnerContainer?: boolean
}

const maxWidthClasses: Record<string, string> = {
  'max-w-3xl': 'max-w-3xl',
  'max-w-4xl': 'max-w-4xl',
  'max-w-5xl': 'max-w-5xl',
  'max-w-6xl': 'max-w-6xl',
  none: '',
}

export const ImageBlockComponent: React.FC<Props> = ({ image, maxWidth, alignment }) => {
  if (!image || typeof image === 'string') return null

  const maxWidthClass = maxWidth ? (maxWidthClasses[maxWidth] ?? 'max-w-4xl') : 'max-w-4xl'
  const isCenter = alignment !== 'left'

  return (
    <div className="container">
      <div className={cn(maxWidthClass, isCenter && 'mx-auto')}>
        <Media
          resource={image}
          imgClassName="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  )
}
