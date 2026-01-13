'use client'

import React from 'react'
import type { Integration } from '@/payload-types'
import { IntegrationCard } from '@/blocks/Integrations/IntegrationCard'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { RevealList, RevealListItem } from '@/components/ui/reveal-list'

interface RelatedIntegrationsClientProps {
  integrations: Integration[]
}

export const RelatedIntegrationsClient: React.FC<RelatedIntegrationsClientProps> = ({
  integrations,
}) => {
  if (!integrations || integrations.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <RevealOnScroll
          duration={0.6}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
        >
          More Integrations
        </RevealOnScroll>
        <RevealList
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {integrations.map((integration) => (
            <RevealListItem key={integration.id}>
              <IntegrationCard integration={integration} showLogo={true} isFeatured={true} />
            </RevealListItem>
          ))}
        </RevealList>
      </div>
    </div>
  )
}
