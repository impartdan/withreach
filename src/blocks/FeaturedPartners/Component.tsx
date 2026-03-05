import type {
  Integration,
  FeaturedPartnersBlock as FeaturedPartnersBlockProps,
} from '@/payload-types'

import { getPayloadClient } from '@/utilities/getPayloadClient'
import React from 'react'
import { IntegrationCard } from '@/blocks/Integrations/IntegrationCard'
import { Media as MediaComponent } from '@/components/Media'
import { Link } from 'next-view-transitions'

export const FeaturedPartnersBlock: React.FC<
  FeaturedPartnersBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, title, integrations: selectedIntegrations, slimLayout } = props

  if (!selectedIntegrations || selectedIntegrations.length === 0) {
    return null
  }

  const payload = await getPayloadClient()

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
      <h2 className="type-display-md text-center mb-12">{title}</h2>
      {slimLayout ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {integrations.map((integration) => (
            <Link
              key={integration.id}
              href={`/partners/integrations/${integration.slug}`}
              className="flex items-center justify-between p-4 bg-brand-linen rounded-[10px] group hover:bg-white border-transparent border hover:border-black/20 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4 min-w-0">
                {integration.icon && (
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <MediaComponent resource={integration.icon} className="w-6 h-6 object-contain" />
                  </div>
                )}
                <span className="type-display-md truncate">{integration.title}</span>
              </div>
              <div className="flex items-center gap-3 text-base font-semibold text-[#1E1A15] shrink-0">
                <svg width="4" height="8" viewBox="0 0 4 8" fill="none">
                  <path d="M0.5 0.5L3.5 4L0.5 7.5" stroke="#1E1A15" strokeWidth="1.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-6 items-start">
          {integrations.map((integration) => (
            <div key={integration.id} className="w-full lg:w-[calc((100%-4.5rem)/4)]">
              <IntegrationCard integration={integration} showLogo={true} isFeatured={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
