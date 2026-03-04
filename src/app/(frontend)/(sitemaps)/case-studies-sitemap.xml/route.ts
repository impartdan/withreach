import { getServerSideSitemap } from 'next-sitemap'
import { getPayloadClient } from '@/utilities/getPayloadClient'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getCaseStudiesSitemap = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: 'case-studies',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((cs) => Boolean(cs?.slug))
          .map((cs) => ({
            loc: `${SITE_URL}/resources/case-studies/${cs?.slug}`,
            lastmod: cs.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['case-studies-sitemap'],
  {
    tags: ['case-studies-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getCaseStudiesSitemap()

  return getServerSideSitemap(sitemap)
}
