'use client'

import React, { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import type { Integration } from '@/payload-types'
import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'

// Category badge color mapping
const getCategoryColor = (categoryTitle: string) => {
  const normalizedTitle = categoryTitle.toLowerCase()
  
  if (normalizedTitle.includes('ecommerce')) {
    return 'bg-green-900/40 text-green-300'
  } else if (normalizedTitle.includes('billing') || normalizedTitle.includes('subscription')) {
    return 'bg-purple-900/40 text-purple-300'
  } else if (normalizedTitle.includes('payment')) {
    return 'bg-orange-900/40 text-orange-300'
  }
  
  return 'bg-secondary text-secondary-foreground'
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
  featuredIds: string[]
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
      <div className="mb-8">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder={`Search all ${allIntegrations.length} integrations`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-normal">{title}</h2>
        </div>
      )}

      {/* Results count when searching */}
      {isSearching && (
        <div className="mb-6 text-sm text-muted-foreground">
          {displayedIntegrations.length} {displayedIntegrations.length === 1 ? 'result' : 'results'} found
        </div>
      )}

      {/* Integration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedIntegrations.map((integration) => {
          const category = typeof integration.category === 'object' ? integration.category : null
          const logo = typeof integration.logo === 'object' ? integration.logo : null
          const isFeatured = featuredIds.includes(integration.id)
          const showLogo = !isSearching || isFeatured
          
          return (
            <article
              key={integration.id}
              className="flex flex-col border border-border rounded-lg bg-card hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="p-6 flex flex-col flex-1">
                {/* Category Badge */}
                {category && (
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-md ${getCategoryColor(category.title)}`}>
                      {category.title}
                    </span>
                  </div>
                )}
                
                {/* Logo - only show for featured when searching */}
                {showLogo && logo && (
                  <div className="mb-6 h-12 flex items-center justify-start relative">
                    {logo.mimeType === 'image/svg+xml' ? (
                      <img
                        src={getMediaUrl(logo.url, logo.updatedAt)}
                        alt={logo.alt || integration.title}
                        className="max-h-12 max-w-full w-auto object-contain"
                      />
                    ) : (
                      <Media
                        resource={logo}
                        imgClassName="max-h-12 max-w-full w-auto object-contain"
                      />
                    )}
                  </div>
                )}
                
                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-foreground">{integration.title}</h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {integration.description}
                </p>
                
                {/* Link - only show for featured integrations */}
                {isFeatured && integration.link && (
                  <div className="pt-2">
                    <Link
                      href={integration.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Explore
                      <svg
                        className="ml-1 w-4 h-4"
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
          <article className="flex flex-col border border-border rounded-lg bg-card items-center justify-center p-8 text-center min-h-[280px]">
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Not seeing your integration?
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Search our full directory
            </p>
            <button
              onClick={() => searchInputRef.current?.focus()}
              className="px-6 py-2 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </article>
        )}
      </div>

      {/* No results message */}
      {displayedIntegrations.length === 0 && isSearching && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No integrations found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 text-sm text-primary hover:text-primary/80 underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}
