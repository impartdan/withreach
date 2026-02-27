import React from 'react'
import type { CtaSmallBlock as CtaSmallBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'
import { bgColorClasses, colorToCss } from '@/blocks/BlockWrapper'
import type { BackgroundColor } from '@/fields/blockSettings'

const bgPositionClasses: Record<string, string> = {
  center: 'bg-center',
  top: 'bg-top',
  bottom: 'bg-bottom',
  left: 'bg-left',
  right: 'bg-right',
}

type Card = CtaSmallBlockProps['cards'][number]

function resolveCardBackground(card: Card) {
  const bgType = card.background ?? 'none'

  const bgColorClass =
    bgType === 'color' || bgType === 'image'
      ? card.backgroundColor
        ? (bgColorClasses[card.backgroundColor as BackgroundColor] ?? 'bg-brand-off-white')
        : 'bg-brand-off-white'
      : bgType === 'none'
        ? 'bg-brand-off-white'
        : ''

  const gradientStyle =
    bgType === 'gradient' && card.gradientFrom && card.gradientTo
      ? {
          background: `linear-gradient(${
            card.gradientDirection === 'right' ? 'to right' : 'to bottom'
          }, ${colorToCss[card.gradientFrom as BackgroundColor]}, ${colorToCss[card.gradientTo as BackgroundColor]})`,
        }
      : undefined

  const bgImage =
    bgType === 'image' && typeof card.backgroundImage === 'object' && card.backgroundImage !== null
      ? (card.backgroundImage as { url?: string | null })
      : null

  const bgPositionClass = card.backgroundImagePosition
    ? (bgPositionClasses[card.backgroundImagePosition] ?? bgPositionClasses.center)
    : bgPositionClasses.center

  return { bgColorClass, gradientStyle, bgImage, bgPositionClass }
}

export const CtaSmallBlock: React.FC<CtaSmallBlockProps> = ({ logo, cards }) => {
  const logoResource = logo && typeof logo === 'object' ? logo : null
  return (
    <div className="container">
      {Array.isArray(cards) && cards.length > 0 && (
        <div
          className={`grid gap-6 ${cards.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}
        >
          {cards.map((card, index) => {
            const { bgColorClass, gradientStyle, bgImage, bgPositionClass } =
              resolveCardBackground(card)

            return (
              <div
                key={index}
                className={cn(
                  'relative overflow-hidden rounded-[8px] min-h-[320px] flex flex-col',
                  !gradientStyle ? bgColorClass : undefined,
                )}
                style={gradientStyle}
              >
                {/* bg image layer */}
                {bgImage?.url && (
                  <div
                    className={cn('absolute inset-0 z-0 bg-cover bg-no-repeat', bgPositionClass)}
                    style={{ backgroundImage: `url(${bgImage.url})` }}
                  />
                )}

                {/* content */}
                <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center gap-4 flex-1">
                  {logoResource && (
                    logoResource.mimeType === 'image/svg+xml' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={getMediaUrl(logoResource.url, logoResource.updatedAt)}
                        alt={logoResource.alt || ''}
                        className="h-10 w-auto object-contain"
                      />
                    ) : (
                      <div className="relative h-10 w-auto">
                        <Media resource={logoResource} imgClassName="h-10 w-auto object-contain" />
                      </div>
                    )
                  )}

                  {card.heading && (
                    <h3 className="text-2xl md:text-3xl font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black">
                      {card.heading}
                    </h3>
                  )}

                  {card.description && (
                    <RichText
                      className="text-sm md:text-base text-brand-black/70 leading-[1.5] [&>p]:mb-0"
                      data={card.description}
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}

                  {card.link && (
                    <div className="mt-2">
                      <CMSLink size="default" {...card.link} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
