import type { Integration, IntegrationsBlock as IntegrationsBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { IntegrationsClient } from './Component.client'

export const IntegrationsBlock: React.FC<
  IntegrationsBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, title, selectedIntegrations, pinnedIntegrations } = props

  const payload = await getPayload({ config: configPromise })

  // Get all integrations for search
  const allIntegrationsResult = await payload.find({
    collection: 'integrations',
    depth: 1,
    limit: 1000,
    sort: 'title',
  })

  const allIntegrations = allIntegrationsResult.docs

  // Get pinned integrations in the specified order
  let pinnedIntegrationsArray: Integration[] = []
  let pinnedIds: (string | number)[] = []

  if (pinnedIntegrations && pinnedIntegrations.length > 0) {
    const pinnedIdsExtracted = pinnedIntegrations
      .map((integration) => {
        if (typeof integration === 'object' && integration !== null) {
          return integration.id
        }
        return integration
      })
      .filter(Boolean) as (string | number)[]

    pinnedIds = pinnedIdsExtracted

    const result = await payload.find({
      collection: 'integrations',
      depth: 1,
      where: {
        id: {
          in: pinnedIdsExtracted,
        },
      },
      limit: 100,
    })

    // Sort by the order they were pinned
    pinnedIntegrationsArray = pinnedIdsExtracted
      .map((id) => result.docs.find((doc) => doc.id === id))
      .filter((doc): doc is Integration => doc !== undefined)
  }

  // Get featured integrations in the specified order
  let featuredIntegrations: Integration[] = []
  let featuredIds: (string | number)[] = []

  if (selectedIntegrations && selectedIntegrations.length > 0) {
    const selectedIds = selectedIntegrations
      .map((integration) => {
        if (typeof integration === 'object' && integration !== null) {
          return integration.id
        }
        return integration
      })
      .filter(Boolean) as (string | number)[]

    featuredIds = selectedIds

    const result = await payload.find({
      collection: 'integrations',
      depth: 1,
      where: {
        id: {
          in: selectedIds,
        },
      },
      limit: 100,
    })

    // Sort by the order they were selected
    featuredIntegrations = selectedIds
      .map((id) => result.docs.find((doc) => doc.id === id))
      .filter((doc): doc is Integration => doc !== undefined)
  } else {
    // If no featured selected, show all integrations alphabetically by default
    featuredIntegrations = allIntegrations
    featuredIds = allIntegrations.map((integration) => integration.id)
  }

  return (
    <div className="container" id={`block-${id}`}>
      <IntegrationsClient
        title={title}
        featuredIntegrations={featuredIntegrations}
        allIntegrations={allIntegrations}
        featuredIds={featuredIds}
        pinnedIntegrations={pinnedIntegrationsArray}
        pinnedIds={pinnedIds}
      />
    </div>
  )
}
