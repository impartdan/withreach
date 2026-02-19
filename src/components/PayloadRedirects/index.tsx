import type React from 'react'
import type { Page, Post } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { getPagePath } from '@/utilities/getPagePath'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    const relationTo = redirectItem.to?.reference?.relationTo

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Page | Post
      redirectUrl =
        relationTo === 'pages'
          ? getPagePath(document as Page)
          : `/${relationTo}/${document?.slug}`
    } else {
      const value = redirectItem.to?.reference?.value
      redirectUrl =
        relationTo === 'pages' && typeof value === 'object' && value
          ? getPagePath(value as Page)
          : `/${relationTo}/${typeof value === 'object' && value ? value.slug : ''}`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
