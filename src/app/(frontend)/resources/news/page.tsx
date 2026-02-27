import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug, type Where } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Category } from '@/payload-types'

import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { FeaturedPosts } from '@/components/NewsArchive/FeaturedPosts'
import { CategoryFilter } from '@/components/NewsArchive/CategoryFilter'
import { BrowseSection } from '@/components/BrowseSection'
import { fetchPosts } from './actions'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

const queryPageByPath = cache(async ({ pathSegments }: { pathSegments: string[] }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  let parentId: number | null = null
  let page: RequiredDataFromCollectionSlug<'pages'> | null = null

  for (const segment of pathSegments) {
    const where: Where = {
      slug: { equals: segment },
    }
    if (parentId === null) {
      where.parent = { equals: null }
    } else {
      where.parent = { equals: parentId }
    }

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where,
    })

    page = result.docs?.[0] ?? null
    if (!page) return null
    parentId = typeof page.id === 'number' ? page.id : null
  }

  return page
})

type Args = {
  searchParams: Promise<{
    category?: string
    page?: string
  }>
}

export default async function NewsArchivePage({ searchParams: searchParamsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const searchParams = await searchParamsPromise
  const categorySlug = searchParams.category || null
  const pageNumber = Math.max(1, parseInt(searchParams.page || '1', 10) || 1)

  const payload = await getPayload({ config: configPromise })

  const [page, newsSettings, categoriesResult, posts] = await Promise.all([
    queryPageByPath({ pathSegments: ['resources', 'news'] }),
    payload.findGlobal({ slug: 'news-settings', depth: 2 }),
    payload.find({ collection: 'categories', limit: 100, sort: 'title', where: { parent: { exists: false } } }),
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 9,
      page: pageNumber,
      sort: '-publishedAt',
      overrideAccess: false,
      where: categorySlug
        ? { 'categories.slug': { equals: categorySlug } }
        : {},
      select: {
        title: true,
        slug: true,
        categories: true,
        heroImage: true,
        meta: true,
      },
    }),
  ])

  const categories = categoriesResult.docs
  const featuredPosts = newsSettings.featuredPosts

  const resolvedFeaturedCategories = (newsSettings.featuredCategories ?? []).filter(
    (c): c is Category => typeof c === 'object' && c !== null,
  )
  const pillCategories = resolvedFeaturedCategories.length > 0 ? resolvedFeaturedCategories : categories

  return (
    <article>
      {page && <PageClient id={String(page.id)} collection="pages" />}
      {draft && <LivePreviewListener />}

      {page?.hero && (
        <RenderHero
          hero={page.hero}
          after={
            pillCategories.length > 0 && (
              <div className="container flex justify-center gap-4 flex-wrap pb-sm">
                <CategoryFilter
                  categories={pillCategories}
                  activeCategory={categorySlug}
                  variant="pills"
                  scrollTarget="browse"
                />
              </div>
            )
          }
        />
      )}

      {featuredPosts && Array.isArray(featuredPosts) && featuredPosts.length > 0 && (
        <FeaturedPosts posts={featuredPosts} />
      )}

      <BrowseSection
        variant="posts"
        initialDocs={posts.docs}
        initialTotalPages={posts.totalPages}
        initialPage={posts.page!}
        initialCategory={categorySlug}
        categories={categories}
        basePath="/resources/news"
        fetchAction={fetchPosts}
      />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageByPath({ pathSegments: ['resources', 'news'] })
  return generateMeta({ doc: page })
}
