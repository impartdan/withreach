import { getServerSideSitemap } from 'next-sitemap'
import { getPayloadClient } from '@/utilities/getPayloadClient'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getIntegrationsSitemap = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: 'integrations',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((integration) => Boolean(integration?.slug))
          .map((integration) => ({
            loc: `${SITE_URL}/partners/integrations/${integration?.slug}`,
            lastmod: integration.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['integrations-sitemap'],
  {
    tags: ['integrations-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getIntegrationsSitemap()

  return getServerSideSitemap(sitemap)
}
