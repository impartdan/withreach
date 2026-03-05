import { HeaderClient } from './Component.client'
import { getPayloadClient } from '@/utilities/getPayloadClient'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const payload = await getPayloadClient()

  // Avoid unstable_cache size limits for large header global payloads.
  const headerData: Header = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  // Preload latest posts and case studies for automatic mode dropdowns
  const [latestPostsResult, latestCaseStudiesResult] = await Promise.all([
    payload.find({
      collection: 'posts',
      limit: 2,
      depth: 2,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'case-studies',
      limit: 1,
      depth: 2,
      sort: '-publishedAt',
    }),
  ])

  return (
    <HeaderClient
      data={headerData}
      latestPosts={latestPostsResult.docs}
      latestCaseStudies={latestCaseStudiesResult.docs}
    />
  )
}
