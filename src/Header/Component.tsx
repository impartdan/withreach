import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 4)()

  // Preload latest posts and case studies for automatic mode dropdowns
  const payload = await getPayload({ config: configPromise })
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
