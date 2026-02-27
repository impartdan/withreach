'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function fetchCaseStudies(category: string | null, page: number) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    depth: 1,
    limit: 9,
    page,
    sort: '-publishedAt',
    overrideAccess: false,
    where: category ? { 'categories.slug': { equals: category } } : {},
    select: {
      title: true,
      slug: true,
      companyName: true,
      companyLogo: true,
      categories: true,
      heroImage: true,
      meta: true,
    },
  })

  return {
    docs: result.docs,
    totalPages: result.totalPages,
    page: result.page!,
  }
}
