'use client'

import React from 'react'
import Link from 'next/link'
import type { Integration } from '@/payload-types'
import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'

// Category badge color mapping
export const getCategoryColor = (categoryTitle: string) => {
  const normalizedTitle = categoryTitle.toLowerCase()

  if (normalizedTitle.includes('ecommerce')) {
    return 'bg-green-100 text-green-800'
  } else if (normalizedTitle.includes('billing') || normalizedTitle.includes('subscription')) {
    return 'bg-purple-100 text-purple-800'
  } else if (normalizedTitle.includes('payment')) {
    return 'bg-orange-100 text-orange-800'
  }

  return 'bg-gray-100 text-gray-800'
}

export interface IntegrationCardProps {
  integration: Integration
  showLogo?: boolean
  showLink?: boolean
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  showLogo = true,
  showLink = true,
}) => {
  const category = typeof integration.category === 'object' ? integration.category : null
  const logo = typeof integration.logo === 'object' ? integration.logo : null
  const isLinkable = showLink && integration.link

  const cardContent = (
    <>
      {/* Category Badge */}
      {category && (
        <div className="-mt-[45px] mb-8">
          <span
            className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full ${getCategoryColor(category.title)}`}
          >
            {category.title}
          </span>
        </div>
      )}

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
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">{integration.title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1">
        {integration.description}
      </p>

      {/* Link indicator */}
      {isLinkable && (
        <div className="pt-2 mt-auto">
          <span className="inline-flex items-center text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors group">
            Explore
            <svg
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      )}
    </>
  )

  return (
    <article className="flex flex-col border border-gray-200 rounded-xl bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
      {isLinkable ? (
        <Link
          href={integration.link!}
          target="_blank"
          rel="noopener noreferrer"
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
