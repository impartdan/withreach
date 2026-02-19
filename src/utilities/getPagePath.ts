import type { Page } from '@/payload-types'

type PageLike = Pick<Page, 'slug' | 'breadcrumbs'>

/**
 * Returns the full URL path for a page, accounting for nested pages.
 * Uses breadcrumbs[last].url (stored by nestedDocsPlugin) when available,
 * falling back to /${slug} for root pages without breadcrumb data.
 * Always returns a path with a leading slash, e.g. "/product/merchant-of-record".
 * Returns "/" for the home page (slug === "home").
 */
export function getPagePath(page: PageLike): string {
  if (page.slug === 'home') return '/'

  const breadcrumbs = page.breadcrumbs
  if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    const lastUrl = breadcrumbs.at(-1)?.url
    if (lastUrl) return lastUrl.startsWith('/') ? lastUrl : `/${lastUrl}`
  }

  return `/${page.slug}`
}
