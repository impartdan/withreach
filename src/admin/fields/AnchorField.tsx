'use client'
import React, { useState, useEffect } from 'react'
import { TextInput, useField } from '@payloadcms/ui'

import { toKebabCase } from '@/utilities/toKebabCase'

function slugify(value: string): string {
  return toKebabCase(value)
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Lenient slugify used during typing: converts spaces/dashes to dashes but
// does NOT strip trailing dashes, so "about-" stays "about-" mid-type.
function slugifyIntermediate(value: string): string {
  return toKebabCase(value)
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-/, '')
}

export const AnchorFieldComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  // rawValue drives the visible input; value (from Payload) drives save state.
  const [rawValue, setRawValue] = useState<string>(value || '')

  // Sync display if Payload resets the field externally (e.g. form reload).
  useEffect(() => {
    setRawValue((prev) => {
      const slugifiedPrev = slugify(prev)
      return slugifiedPrev === (value || '') ? prev : (value || '')
    })
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setRawValue(raw)
    // Save the intermediate slug (trailing dash allowed while typing).
    setValue(slugifyIntermediate(raw).replace(/^-|-$/g, ''))
  }

  const handleBlur = () => {
    const clean = slugify(rawValue)
    setRawValue(clean)
    setValue(clean)
  }

  return (
    <TextInput
      path={path}
      value={rawValue}
      onChange={handleChange}
      onBlur={handleBlur}
      label="Section Anchor"
      description="Used for in-page linking. Type naturally — it will be auto-formatted to a URL-safe slug (e.g. about-us)."
      placeholder="e.g. about-us"
    />
  )
}
