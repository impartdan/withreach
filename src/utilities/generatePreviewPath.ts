import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/resources/news',
  'case-studies': '/resources/case-studies',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  /** Full nested path override (e.g. from nestedDocsPlugin breadcrumbs). When provided, used instead of the auto-generated slug-only path. */
  path?: string
}

export const generatePreviewPath = ({ collection, slug, path: pathOverride }: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)

  const resolvedPath =
    pathOverride !== undefined && pathOverride !== null
      ? pathOverride
      : `${collectionPrefixMap[collection]}/${encodedSlug}`

  const encodedParams = new URLSearchParams({
    slug: encodedSlug,
    collection,
    path: resolvedPath,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
