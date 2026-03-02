'use client'
import React from 'react'
import { TextInput, useField } from '@payloadcms/ui'

import { toKebabCase } from '@/utilities/toKebabCase'

function slugify(value: string): string {
  return toKebabCase(value)
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export const AnchorFieldComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <TextInput
      path={path}
      value={value || ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(slugify(e.target.value))}
      label="Section Anchor"
      description="Used for in-page linking. Type naturally — it will be auto-formatted to a URL-safe slug (e.g. about-us)."
      placeholder="e.g. about-us"
    />
  )
}
