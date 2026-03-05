'use client'

import React, { useMemo, useState } from 'react'
import { useField } from '@payloadcms/ui'

type ClipboardParseResult = {
  blocks: unknown[]
  source: 'array' | 'layout' | 'value' | 'single'
}

const stripStringIDs = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(stripStringIDs)
  }

  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>
    const cleanedEntries = Object.entries(objectValue)
      .filter(([key, entryValue]) => !(key === 'id' && typeof entryValue === 'string'))
      .map(([key, entryValue]) => [key, stripStringIDs(entryValue)] as const)

    return Object.fromEntries(cleanedEntries)
  }

  return value
}

const parseClipboardPayload = (rawText: string): ClipboardParseResult => {
  const parsed = JSON.parse(rawText) as unknown

  if (Array.isArray(parsed)) {
    return { blocks: parsed, source: 'array' }
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Clipboard JSON must be a block object or an array of blocks.')
  }

  const objectValue = parsed as Record<string, unknown>

  if (Array.isArray(objectValue.layout)) {
    return { blocks: objectValue.layout, source: 'layout' }
  }

  if (Array.isArray(objectValue.value)) {
    return { blocks: objectValue.value, source: 'value' }
  }

  if (typeof objectValue.blockType === 'string') {
    return { blocks: [objectValue], source: 'single' }
  }

  throw new Error('Could not find blocks. Expected array, { layout: [...] }, { value: [...] }, or a single block object.')
}

export const AppendLayoutFromClipboardField: React.FC = () => {
  const { value, setValue } = useField<unknown[]>({ path: 'layout' })
  const [status, setStatus] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const currentCount = useMemo(() => (Array.isArray(value) ? value.length : 0), [value])

  const handleAppend = async () => {
    setStatus('')
    setIsError(false)

    try {
      const clipboardText = await navigator.clipboard.readText()

      if (!clipboardText?.trim()) {
        throw new Error('Clipboard is empty.')
      }

      const { blocks, source } = parseClipboardPayload(clipboardText)
      if (blocks.length === 0) {
        throw new Error('Clipboard block payload is empty.')
      }

      const cleanedBlocks = stripStringIDs(blocks) as unknown[]
      const currentBlocks = Array.isArray(value) ? value : []

      setValue([...currentBlocks, ...cleanedBlocks])
      setStatus(`Appended ${cleanedBlocks.length} block(s) from ${source} payload.`)
    } catch (error) {
      setIsError(true)
      setStatus(error instanceof Error ? error.message : 'Unable to append clipboard blocks.')
    }
  }

  return (
    <div
      style={{
        marginBottom: '0.75rem',
        padding: '0.75rem',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '6px',
        background: 'var(--theme-elevation-50)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ fontSize: '0.8125rem', color: 'var(--theme-elevation-700)' }}>
          Layout blocks: <strong>{currentCount}</strong>
        </div>
        <button
          type="button"
          onClick={handleAppend}
          style={{
            padding: '0.45rem 0.75rem',
            border: '1px solid var(--theme-elevation-300)',
            borderRadius: '4px',
            background: 'var(--theme-elevation-0)',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            color: 'var(--theme-elevation-900)',
          }}
        >
          Append Blocks from Clipboard
        </button>
      </div>

      <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.75rem', color: 'var(--theme-elevation-600)' }}>
        Use this when you want clipboard blocks to be added after existing Page Blocks, instead of replacing them.
      </p>

      {status ? (
        <p
          style={{
            marginTop: '0.5rem',
            marginBottom: 0,
            fontSize: '0.75rem',
            color: isError ? 'var(--theme-error-500)' : 'var(--theme-success-500)',
          }}
        >
          {status}
        </p>
      ) : null}
    </div>
  )
}
