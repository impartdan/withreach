'use client'
import { Button, type ButtonProps } from '@/components/ui/button'
import { useBlockTheme } from '@/components/BlockThemeContext'
import { cn } from '@/utilities/ui'
import { Link } from 'next-view-transitions'
import React from 'react'

import type { Page, Post, CaseStudy } from '@/payload-types'
import { getPagePath } from '@/utilities/getPagePath'

const collectionPathMap: Record<string, string> = {
  posts: '/resources/news',
  'case-studies': '/resources/case-studies',
}

const lightVariantMap: Partial<Record<NonNullable<ButtonProps['variant']>, ButtonProps['variant']>> =
  {
    default: 'default-invert',
    outline: 'outline-invert',
    arrow: 'arrow-invert',
  }

const ArrowIcon = () => (
  <svg
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0.75 8.75L4.89286 4.75L0.75 0.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'case-studies'
    value: Page | Post | CaseStudy | string | number
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
        : `${collectionPathMap[reference.relationTo] || ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const isArrow = appearance === 'arrow'
  const size = appearance === 'link' || isArrow ? 'clear' : sizeFromProps
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
        {label && <span>{label}</span>}
        {children && children}
        {isArrow && <ArrowIcon />}
      </Link>
    </Button>
  )
}
