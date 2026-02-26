import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { getPagePath } from '../../../utilities/getPagePath'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = getPagePath(doc)

      payload.logger.info(`Revalidating page at path: ${path}`)

      try {
        revalidatePath(path)
        revalidateTag('pages-sitemap')
      } catch (_err) {
        // revalidatePath requires Next.js request context; skip when running outside (e.g. scripts)
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = getPagePath(previousDoc)

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      try {
        revalidatePath(oldPath)
        revalidateTag('pages-sitemap')
      } catch (_err) {
        // revalidatePath requires Next.js request context; skip when running outside (e.g. scripts)
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = getPagePath(doc)
    try {
      revalidatePath(path)
      revalidateTag('pages-sitemap')
    } catch (_err) {
      // revalidatePath requires Next.js request context; skip when running outside (e.g. scripts)
    }
  }

  return doc
}
