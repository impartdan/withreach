'use client'

import React, { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import type { Integration } from '@/payload-types'
import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Button } from '@/components/ui/button'

// Category badge color mapping
const getCategoryColor = (categoryTitle: string) => {
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

// Simple fuzzy search function
const fuzzySearch = (searchTerm: string, text: string): boolean => {
  const search = searchTerm.toLowerCase()
  const target = text.toLowerCase()

  // If it's a direct substring match, return true
  if (target.includes(search)) {
    return true
  }

  // Fuzzy match: check if characters appear in order
  let searchIndex = 0
  for (let i = 0; i < target.length && searchIndex < search.length; i++) {
    if (target[i] === search[searchIndex]) {
      searchIndex++
    }
  }

  return searchIndex === search.length
}

interface IntegrationsClientProps {
  title: string
  featuredIntegrations: Integration[]
  allIntegrations: Integration[]
  featuredIds: (string | number)[]
}

export const IntegrationsClient: React.FC<IntegrationsClientProps> = ({
  title,
  featuredIntegrations,
  allIntegrations,
  featuredIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  const displayedIntegrations = useMemo(() => {
    // If no search term, show only featured integrations in the specified order
    if (!searchTerm.trim()) {
      return featuredIntegrations
    }

    // When searching, search ALL integrations and sort alphabetically
    const filtered = allIntegrations
      .filter((integration) => fuzzySearch(searchTerm, integration.title))
      .sort((a, b) => a.title.localeCompare(b.title))

    return filtered
  }, [searchTerm, featuredIntegrations, allIntegrations])

  const isSearching = searchTerm.trim().length > 0

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-12">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder={`Search all ${allIntegrations.length} integrations`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-4 pl-14 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder:text-gray-500 text-lg"
          />
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Title - only show when not searching */}
      {!isSearching && (
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">{title}</h2>
        </div>
      )}

      {/* Results count when searching */}
      {isSearching && (
        <div className="mb-8 text-base text-gray-600">
          {displayedIntegrations.length} {displayedIntegrations.length === 1 ? 'result' : 'results'}{' '}
          found
        </div>
      )}

      {/* Integration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedIntegrations.map((integration) => {
          const category = typeof integration.category === 'object' ? integration.category : null
          const logo = typeof integration.logo === 'object' ? integration.logo : null
          const isFeatured = featuredIds.includes(integration.id)
          const showLogo = !isSearching || isFeatured

          return (
            <article
              key={integration.id}
              className="flex flex-col border border-gray-200 rounded-xl bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="p-8 flex flex-col flex-1">
                {/* Category Badge */}
                {category && (
                  <div className="mb-6">
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full ${getCategoryColor(category.title)}`}
                    >
                      {category.title}
                    </span>
                  </div>
                )}

                {/* Logo - only show for featured when searching */}
                {showLogo && logo && (
                  <div className="mb-8 h-16 flex items-start">
                    {logo.mimeType === 'image/svg+xml' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={getMediaUrl(logo.url, logo.updatedAt)}
                        alt={logo.alt || integration.title}
                        className="max-h-16 max-w-[180px] w-auto object-contain object-left"
                      />
                    ) : (
                      <Media
                        resource={logo}
                        imgClassName="max-h-16 max-w-[180px] w-auto object-contain object-left"
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

                {/* Link - only show for featured integrations */}
                {isFeatured && integration.link && (
                  <div className="pt-2 mt-auto">
                    <Link
                      href={integration.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-base font-medium text-gray-900 hover:text-gray-700 transition-colors group"
                    >
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
                    </Link>
                  </div>
                )}
              </div>
            </article>
          )
        })}

        {/* Placeholder Card - only show when not searching */}
        {!isSearching && (
          <article className="flex flex-col border border-gray-200 rounded-xl bg-white items-center justify-center p-8 text-center min-h-[320px]">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Not seeing your integration?
            </h3>
            <p className="text-gray-600 text-base mb-8">Search our full directory</p>
            <Button onClick={() => searchInputRef.current?.focus()} size="lg">
              Search
            </Button>
          </article>
        )}
      </div>

      {/* No results - show as a card in the grid */}
      {displayedIntegrations.length === 0 && isSearching && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <article className="flex flex-col border border-gray-200 rounded-xl bg-white items-center justify-center p-12 text-center min-h-[320px] sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">No integrations found</h3>
              <p className="text-gray-600 text-base mb-8 leading-relaxed">
                We couldn&apos;t find any integrations matching &quot;{searchTerm}&quot;. Try
                adjusting your search or browse all integrations.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">Connect with Sales</Link>
              </Button>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
