import type { LogoListBlock as LogoListBlockProps } from '@/payload-types'
import React from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const LogoListBlock: React.FC<
  LogoListBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, logos } = props

  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <div className="container max-w-5xl py-5 lg:py-10" id={id ? `block-${id}` : undefined}>
      {/* Logo Grid: 2 columns on mobile, 4 on tablet, 6 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12 items-center">
        {logos.map((item, index) => {
          const logo = typeof item.logo === 'object' ? item.logo : null

          if (!logo) return null

          const logoElement = (
            <div className="flex items-center justify-center p-4 md:p-6 h-24 md:h-28">
              {logo.mimeType === 'image/svg+xml' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getMediaUrl(logo.url, logo.updatedAt)}
                  alt={item.alt || logo.alt || ''}
                  className="max-h-full max-w-full w-auto h-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <Media
                  resource={logo}
                  imgClassName="max-h-full max-w-full w-auto h-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              )}
            </div>
          )

          // If there's a link, wrap in an anchor tag
          if (item.link) {
            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-200"
              >
                {logoElement}
              </a>
            )
          }

          // Otherwise just render the logo
          return <div key={index}>{logoElement}</div>
        })}
      </div>
    </div>
  )
}
