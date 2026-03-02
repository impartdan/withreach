import type { Integration, FeaturedPartnersBlock as FeaturedPartnersBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { IntegrationCard } from '@/blocks/Integrations/IntegrationCard'

export const FeaturedPartnersBlock: React.FC<
  FeaturedPartnersBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, title, integrations: selectedIntegrations } = props

  if (!selectedIntegrations || selectedIntegrations.length === 0) {
    return null
  }

  const payload = await getPayload({ config: configPromise })

  const selectedIds = selectedIntegrations
    .map((integration) => {
      if (typeof integration === 'object' && integration !== null) {
        return integration.id
      }
      return integration
    })
    .filter(Boolean) as (string | number)[]

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

  // Preserve the admin-defined order
  const integrations: Integration[] = selectedIds
    .map((integrationId) => result.docs.find((doc) => doc.id === integrationId))
    .filter((doc): doc is Integration => doc !== undefined)

  if (integrations.length === 0) {
    return null
  }

  return (
    <div className="container" id={`block-${id}`}>
      <h2 className="type-display-m text-center mb-12">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            showLogo={true}
            isFeatured={true}
          />
        ))}
      </div>
    </div>
  )
}
