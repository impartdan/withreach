'use client'
import { Button, type ButtonProps } from '@/components/ui/button'
import { useBlockTheme } from '@/components/BlockThemeContext'
import { cn } from '@/utilities/ui'
import { Link } from 'next-view-transitions'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { getPagePath } from '@/utilities/getPagePath'

const lightVariantMap: Partial<Record<NonNullable<ButtonProps['variant']>, ButtonProps['variant']>> =
  {
    default: 'default-invert',
    outline: 'outline-invert',
  }

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

  const blockTheme = useBlockTheme()

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? reference.relationTo === 'pages' && 'breadcrumbs' in reference.value
        ? getPagePath(reference.value as Page)
        : `/${reference.relationTo}/${(reference.value as Post).slug}`
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

  const resolvedVariant =
    blockTheme === 'light'
      ? (lightVariantMap[appearance as NonNullable<ButtonProps['variant']>] ?? appearance)
      : (appearance as ButtonProps['variant'])

  return (
    <Button asChild className={className} size={size} variant={resolvedVariant}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
