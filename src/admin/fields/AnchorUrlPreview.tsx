'use client'
import React, { useState } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

import { getClientSideURL } from '@/utilities/getURL'

const collectionUrlPrefixes: Record<string, string> = {
  pages: '',
  integrations: '/integrations',
  posts: '/blog',
  'case-studies': '/case-studies',
}

export const AnchorUrlPreviewComponent: React.FC<{ path: string }> = ({ path }) => {
  const [copied, setCopied] = useState(false)

  // Derive the sibling anchor field path by replacing the last path segment
  const anchorPath = path.replace(/\.[^.]+$/, '.anchor')

  const anchorValue = useFormFields(([fields]) => fields[anchorPath]?.value as string | undefined)
  const slugValue = useFormFields(([fields]) => fields['slug']?.value as string | undefined)

  // For nested pages, pull the full path from the last breadcrumb URL.
  // nestedDocsPlugin stores breadcrumbs as breadcrumbs.{n}.url in the form state.
  const allFields = useFormFields(([fields]) => fields)
  const { collectionSlug } = useDocumentInfo()

  if (!anchorValue) return null

  const prefix = collectionUrlPrefixes[collectionSlug ?? ''] ?? ''

  // Attempt to use the breadcrumb URL for a more accurate full path.
  let pagePath: string
  if (collectionSlug === 'pages') {
    const breadcrumbEntries = Object.entries(allFields)
      .filter(([key]) => /^breadcrumbs\.\d+\.url$/.test(key))
      .sort(([a], [b]) => {
        const idxA = parseInt(a.match(/\d+/)?.[0] ?? '0', 10)
        const idxB = parseInt(b.match(/\d+/)?.[0] ?? '0', 10)
        return idxA - idxB
      })
    const lastBreadcrumbUrl = breadcrumbEntries.at(-1)?.[1]?.value as string | undefined
    pagePath = lastBreadcrumbUrl
      ? lastBreadcrumbUrl.startsWith('/')
        ? lastBreadcrumbUrl
        : `/${lastBreadcrumbUrl}`
      : slugValue
        ? `/${slugValue}`
        : ''
  } else {
    const slug = slugValue ? `/${slugValue}` : ''
    pagePath = `${prefix}${slug}`
  }

  const fullUrl = `${getClientSideURL()}${pagePath}#${anchorValue}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.375rem',
        marginTop: '0.5rem',
      }}
    >
      <label
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--theme-elevation-500)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        Anchor URL
      </label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          value={fullUrl}
          readOnly
          style={{
            flex: 1,
            padding: '0.5rem 0.75rem',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            background: 'var(--theme-elevation-50)',
            color: 'var(--theme-elevation-500)',
            fontSize: '0.8125rem',
            fontFamily: 'monospace',
            cursor: 'text',
          }}
        />
        <button
          type="button"
          onClick={handleCopy}
          style={{
            padding: '0.5rem 0.875rem',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            background: copied ? 'var(--theme-success-500)' : 'var(--theme-elevation-0)',
            color: copied ? '#fff' : 'var(--theme-elevation-800)',
            fontSize: '0.8125rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
