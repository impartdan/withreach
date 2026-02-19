import type { LogoListBlock as LogoListBlockProps } from '@/payload-types'
import React from 'react'
import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const LogoListBlock: React.FC<
  LogoListBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, logos, title } = props

  if (!logos || logos.length === 0) {
    return null
  }

  const shouldAnimate = logos.length > 4

  const renderLogo = (item: (typeof logos)[number], index: number) => {
    const logo = typeof item.logo === 'object' ? item.logo : null
    if (!logo) return null

    const logoElement = (
      <div className="relative shrink-0 aspect-[200/75] w-[180px]">
        {logo.mimeType === 'image/svg+xml' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getMediaUrl(logo.url, logo.updatedAt)}
            alt={item.alt || logo.alt || ''}
            className="w-full h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />
        ) : (
          <Media
            resource={logo}
            fill
            imgClassName="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />
        )}
      </div>
    )

    if (item.link) {
      return (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block shrink-0 hover:scale-105 transition-transform duration-200"
        >
          {logoElement}
        </a>
      )
    }

    return (
      <div key={index} className="shrink-0">
        {logoElement}
      </div>
    )
  }

  const titleElement = title ? <p className="text-center type-display-xs mb-6">{title}</p> : null

  // Static single-line layout for 4 or fewer logos
  if (!shouldAnimate) {
    return (
      <div className="container max-w-5xl " id={id ? `block-${id}` : undefined}>
        {titleElement}
        <div className="flex items-center justify-between gap-4 md:gap-8 lg:gap-20">
          {logos.map((item, index) => renderLogo(item, index))}
        </div>
      </div>
    )
  }

  // Animated marquee for more than 4 logos
  // Duration scales with the number of logos for consistent speed
  const duration = `${logos.length * 4}s`

  return (
    <div className="" id={id ? `block-${id}` : undefined}>
      {titleElement && <div className="container max-w-5xl">{titleElement}</div>}
      <div className="overflow-hidden">
        <div
          className="flex w-max hover:[animation-play-state:paused]"
          style={{
            animation: `marquee ${duration} linear infinite`,
          }}
        >
          {/* Render logos twice for seamless loop */}
          {logos.map((item, index) => renderLogo(item, index))}
          {logos.map((item, index) => renderLogo(item, `dup-${index}` as unknown as number))}
        </div>
      </div>
    </div>
  )
}
