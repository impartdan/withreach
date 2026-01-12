import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Header, Post } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 3)()

  // Preload latest posts for automatic mode dropdowns
  const payload = await getPayload({ config: configPromise })
  const latestPosts = await payload.find({
    collection: 'posts',
    limit: 2,
    depth: 2,
    sort: '-publishedAt',
  })

  return <HeaderClient data={headerData} latestPosts={latestPosts.docs} />
}
