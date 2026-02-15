'use client'

import React, { useState, useMemo, useRef } from 'react'
import { Link } from 'next-view-transitions'
import type { Integration } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { IntegrationCard } from './IntegrationCard'
import { RevealList, RevealListItem } from '@/components/ui/reveal-list'

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
  pinnedIntegrations: Integration[]
  pinnedIds: (string | number)[]
}

export const IntegrationsClient: React.FC<IntegrationsClientProps> = ({
  title,
  featuredIntegrations,
  allIntegrations,
  featuredIds,
  pinnedIntegrations,
  pinnedIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const displayedIntegrations = useMemo(() => {
    let filtered: Integration[]

    // If searching, search ALL integrations and sort alphabetically
    if (searchTerm.trim()) {
      filtered = allIntegrations
        .filter((integration) => fuzzySearch(searchTerm, integration.title))
        .sort((a, b) => a.title.localeCompare(b.title))
    }
    // If showing all, show all integrations sorted alphabetically
    else if (showAll) {
      filtered = [...allIntegrations].sort((a, b) => a.title.localeCompare(b.title))
    }
    // Default: show only featured integrations in the specified order
    else {
      filtered = featuredIntegrations
    }

    // Apply pinned integrations logic - always show pinned items first
    if (pinnedIntegrations.length > 0) {
      // Separate pinned and non-pinned integrations
      const pinned = filtered.filter((integration) => pinnedIds.includes(integration.id))
      const nonPinned = filtered.filter((integration) => !pinnedIds.includes(integration.id))

      // Sort pinned items by the order they were pinned
      const sortedPinned = pinnedIds
        .map((id) => pinned.find((integration) => integration.id === id))
        .filter((integration): integration is Integration => integration !== undefined)

      // Combine: pinned first, then non-pinned
      filtered = [...sortedPinned, ...nonPinned]
    }

    return filtered
  }, [searchTerm, showAll, featuredIntegrations, allIntegrations, pinnedIntegrations, pinnedIds])

  const isSearching = searchTerm.trim().length > 0

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-12">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search integrations"
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

      {/* Title with See All/See Featured button - only show when not searching */}
      {!isSearching && (
        <div className="mb-10 flex items-center justify-between">
          <h2 className="type-display-sm">{showAll ? 'Integrations' : title}</h2>
          <Button onClick={() => setShowAll(!showAll)} variant="secondary" size="lg">
            {showAll ? 'See Featured' : 'See All'}
          </Button>
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
      {!isSearching && !showAll ? (
        <>
          {/* Initial page load - with animations */}
          <RevealList
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12 lg:gap-y-16"
            staggerDelay={0.08}
          >
            {displayedIntegrations.map((integration) => {
              const isFeatured = featuredIds.includes(integration.id)
              const isPinned = pinnedIds.includes(integration.id)

              return (
                <RevealListItem key={integration.id}>
                  <IntegrationCard
                    integration={integration}
                    showLogo={true}
                    isPinned={isPinned}
                    isFeatured={isFeatured}
                  />
                </RevealListItem>
              )
            })}

            {/* Placeholder Card - only show when not searching and not showing all */}
            <RevealListItem>
              <article className="h-full flex flex-col border border-gray-200 rounded-xl bg-white items-center justify-center p-8 text-center min-h-[320px]">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Not seeing your integration?
                </h3>
                <p className="text-gray-600 text-base mb-8">Search our full directory</p>
                <Button onClick={() => searchInputRef.current?.focus()} size="lg">
                  Search
                </Button>
              </article>
            </RevealListItem>
          </RevealList>
        </>
      ) : (
        /* Search results or show all - no animations */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12 lg:gap-y-16">
          {displayedIntegrations.map((integration) => {
            const isFeatured = featuredIds.includes(integration.id)
            const isPinned = pinnedIds.includes(integration.id)

            return (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                showLogo={true}
                isPinned={isPinned}
                isFeatured={isFeatured}
              />
            )
          })}
        </div>
      )}

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
