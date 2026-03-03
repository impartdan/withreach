'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'

import { BACKGROUND_COLOR_OPTIONS, BACKGROUND_COLOR_SWATCHES } from '@/fields/backgroundColorOptions'

type PaletteOption = {
  label: string
  value: string
}

type PaletteSelectorProps = {
  path: string
  label?: string
  field?: {
    options?: Array<PaletteOption | string>
    required?: boolean
  }
}

const normalizeOptions = (options?: Array<PaletteOption | string>): PaletteOption[] => {
  if (!options?.length) return [...BACKGROUND_COLOR_OPTIONS]

  return options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option,
  )
}

export const PaletteSelectorField: React.FC<PaletteSelectorProps> = ({ path, label, field }) => {
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const options = normalizeOptions(field?.options)
  const selectedValue = typeof value === 'string' ? value : ''

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '0.75rem',
      }}
    >
      <label
        htmlFor={path}
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--theme-elevation-500)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {label || 'Background Color'}
      </label>

      <div
        id={path}
        role="group"
        aria-label={label || 'Background Color'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '0.5rem',
        }}
      >
        {options.map((option) => {
          const swatchColor = BACKGROUND_COLOR_SWATCHES[option.value] || 'var(--theme-elevation-100)'
          const isSelected = selectedValue === option.value

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setValue(option.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                borderRadius: '6px',
                border: isSelected
                  ? '2px solid var(--theme-success-500)'
                  : '1px solid var(--theme-elevation-200)',
                background: 'var(--theme-elevation-0)',
                padding: '0.5rem',
                textAlign: 'left',
                cursor: 'pointer',
                outlineOffset: '2px',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '1.1rem',
                  height: '1.1rem',
                  borderRadius: '999px',
                  border: '1px solid var(--theme-elevation-300)',
                  background: swatchColor,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--theme-elevation-800)',
                }}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      {showError && errorMessage ? (
        <div style={{ color: 'var(--theme-error-500)', fontSize: '0.75rem' }}>{errorMessage}</div>
      ) : null}
    </div>
  )
}
