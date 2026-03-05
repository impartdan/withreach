'use client'

import React from 'react'
import { Link } from 'next-view-transitions'
import type { Integration } from '@/payload-types'
import { Media } from '@/components/Media'
import { buttonVariants } from '@/components/ui/button'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getCategoryColor } from '@/utilities/getCategoryColor'

export interface IntegrationCardProps {
  integration: Integration
  showLogo?: boolean
  isPinned?: boolean
  isFeatured?: boolean
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  showLogo = true,
  isPinned = false,
  isFeatured = false,
}) => {
  const category = typeof integration.category === 'object' ? integration.category : null
  const logo = typeof integration.logo === 'object' ? integration.logo : null
  const isPubliclyViewable =
    (integration as { isPubliclyViewable?: boolean }).isPubliclyViewable !== false

  const cardContent = (
    <>
      {/* Category Badge and Pinned Indicator */}
      <div className="-mt-[45px] mb-8 flex items-center gap-2">
        {category && (
          <span
            className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full ${getCategoryColor(category.title)} !text-brand-black`}
          >
            {category.title}
          </span>
        )}
        {isPinned && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
            </svg>
            Featured
          </span>
        )}
      </div>

      {/* Logo */}
      {showLogo && logo && (
        <div className="mb-8">
          {logo.mimeType === 'image/svg+xml' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getMediaUrl(logo.url, logo.updatedAt)}
              alt={logo.alt || integration.title}
              className="aspect-[3/1] w-full object-contain object-center"
            />
          ) : (
            <Media
              resource={logo}
              imgClassName="aspect-[3/1] w-full object-contain object-center"
            />
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="type-display-xs text-brand-black mb-4">{integration.title}</h3>

      {/* Description */}
      <p className="type-micro-b mb-6 flex-1">{integration.description}</p>

      {/* Link indicator - only show for featured */}
      {isFeatured && isPubliclyViewable && (
        <div className="pt-2 mt-auto">
          <span className={buttonVariants({ size: 'clear', variant: 'arrow-invert' })}>
            Explore
            <svg className="w-[6px] h-[10px]" fill="none" stroke="currentColor" viewBox="0 0 6 10">
              <path
                d="M0.75 8.75L4.89286 4.75L0.75 0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              />
            </svg>
          </span>
        </div>
      )}
    </>
  )

  return (
    <article className="h-full flex flex-col border border-brand-olive/20 rounded-[8px] bg-white hover:border-brand-olive/40 hover:shadow-md transition-all duration-200 group">
      {isFeatured && isPubliclyViewable ? (
        <Link
          href={`/partners/integrations/${integration.slug}`}
          className="p-8 flex flex-col flex-1"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="p-8 flex flex-col flex-1">{cardContent}</div>
      )}
    </article>
  )
}
