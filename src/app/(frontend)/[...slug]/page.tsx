import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

/**
 * Resolve a page by path segments (e.g. ['support', 'shopper-support']).
 * Walks the parent chain: find root page with first segment, then child with second, etc.
 */
const queryPageByPath = cache(async ({ pathSegments }: { pathSegments: string[] }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  if (pathSegments.length === 0) {
    pathSegments = ['home']
  }

  let parentId: number | null = null
  let page: RequiredDataFromCollectionSlug<'pages'> | null = null

  for (const segment of pathSegments) {
    const where: Record<string, unknown> = {
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

/**
 * Build full path segments for a page from its breadcrumbs + slug (for generateStaticParams).
 */
function getPathSegmentsFromPage(
  page: { slug: string; breadcrumbs?: Array<{ doc?: { slug?: string } | null }> },
): string[] {
  const ancestorSlugs =
    page.breadcrumbs
      ?.map((b) => (typeof b.doc !== 'undefined' && b.doc && typeof b.doc === 'object' ? b.doc.slug : null))
      .filter((s): s is string => Boolean(s)) ?? []
  return [...ancestorSlugs, page.slug]
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      breadcrumbs: {
        doc: { slug: true },
      },
    },
  })

  const params = pages.docs
    ?.filter((doc) => doc.slug !== 'home' || (doc.breadcrumbs?.length ?? 0) > 0)
    .map((doc) => {
      const pathSegments = getPathSegmentsFromPage(doc)
      return { slug: pathSegments }
    })
    .filter((p) => p.slug.length > 0)

  return params ?? []
}

type Args = {
  params: Promise<{
    slug?: string | string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const params = await paramsPromise
  const slugParam = params.slug

  const pathSegments: string[] = Array.isArray(slugParam)
    ? slugParam.map((s) => decodeURIComponent(s))
    : slugParam
      ? [decodeURIComponent(slugParam)]
      : ['home']

  const url = '/' + pathSegments.join('/')
  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageByPath({
    pathSegments,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout, id } = page

  return (
    <article className="">
      <PageClient id={String(id)} collection="pages" />
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout ?? []} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const params = await paramsPromise
  const slugParam = params.slug
  const pathSegments: string[] = Array.isArray(slugParam)
    ? slugParam.map((s) => decodeURIComponent(s))
    : slugParam
      ? [decodeURIComponent(slugParam)]
      : ['home']

  const page = await queryPageByPath({ pathSegments })
  return generateMeta({ doc: page })
}
