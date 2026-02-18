import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Link } from 'next-view-transitions'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

/** Build full URL path for a page (handles nested pages: breadcrumbs + slug). */
function getPagePath(page: Page): string {
  const slug = page.slug
  if (!slug) return ''
  const breadcrumbs = page.breadcrumbs
  const ancestorSlugs = Array.isArray(breadcrumbs)
    ? breadcrumbs
        .map((b) => (b.doc && typeof b.doc === 'object' && 'slug' in b.doc ? b.doc.slug : null))
        .filter((s): s is string => Boolean(s))
    : []
  return [...ancestorSlugs, slug].join('/')
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? (() => {
          const prefix = reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''
          const path =
            reference.relationTo === 'pages' && 'breadcrumbs' in reference.value
              ? getPagePath(reference.value as Page)
              : (reference.value as Post).slug
          return `${prefix}/${path}`
        })()
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
