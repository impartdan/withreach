import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug, type Where } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { FeaturedCaseStudies } from '@/components/CaseStudiesArchive/FeaturedCaseStudies'
import { CategoryFilter } from '@/components/NewsArchive/CategoryFilter'
import { CaseStudyGrid } from '@/components/CaseStudiesArchive/CaseStudyGrid'
import { ArchivePagination } from '@/components/NewsArchive/ArchivePagination'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

const BASE_PATH = '/resources/case-studies'

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

export default async function CaseStudiesArchivePage({ searchParams: searchParamsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const searchParams = await searchParamsPromise
  const categorySlug = searchParams.category || null
  const pageNumber = Math.max(1, parseInt(searchParams.page || '1', 10) || 1)

  const payload = await getPayload({ config: configPromise })

  const [page, csSettings, categoriesResult, caseStudies] = await Promise.all([
    queryPageByPath({ pathSegments: ['resources', 'case-studies'] }),
    payload.findGlobal({ slug: 'case-studies-settings', depth: 2 }),
    payload.find({ collection: 'categories', limit: 100, sort: 'title', where: { parent: { exists: false } } }),
    payload.find({
      collection: 'case-studies',
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
        companyName: true,
        companyLogo: true,
        categories: true,
        heroImage: true,
        meta: true,
      },
    }),
  ])

  const categories = categoriesResult.docs
  const featuredCaseStudies = csSettings.featuredCaseStudies

  return (
    <article>
      {page && <PageClient id={String(page.id)} collection="pages" />}
      {draft && <LivePreviewListener />}

      {page?.hero && <RenderHero hero={page.hero} />}

      {featuredCaseStudies && Array.isArray(featuredCaseStudies) && featuredCaseStudies.length > 0 && (
        <FeaturedCaseStudies caseStudies={featuredCaseStudies} />
      )}

      <div className="bg-white">
        <div className="container">
          <div className="flex items-end justify-between border-t border-brand-gray-light/50 pt-sm pb-md">
            <h2 className="type-display-lg">Browse All</h2>
            <CategoryFilter
              categories={categories}
              activeCategory={categorySlug}
              variant="dropdown"
              basePath={BASE_PATH}
            />
          </div>
        </div>

        <div className="container pb-xl">
          <CaseStudyGrid caseStudies={caseStudies.docs} />

          {caseStudies.totalPages > 1 && (
            <ArchivePagination
              currentPage={caseStudies.page!}
              totalPages={caseStudies.totalPages}
              activeCategory={categorySlug}
              basePath={BASE_PATH}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageByPath({ pathSegments: ['resources', 'case-studies'] })
  return generateMeta({ doc: page })
}
