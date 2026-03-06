import React from 'react'

type LinkChevronProps = {
  tone?: 'dark' | 'brand'
  size?: 'sm' | 'md'
  className?: string
}

const CHEVRON_CONFIG = {
  sm: {
    width: 4,
    height: 7,
    viewBox: '0 0 4 7',
    path: 'M0.5 0.5L3.5 3.5L0.5 6.5',
  },
  md: {
    width: 4,
    height: 8,
    viewBox: '0 0 4 8',
    path: 'M0.5 0.5L3.5 4L0.5 7.5',
  },
} as const

const STROKE_BY_TONE = {
  dark: '#1E1A15',
  brand: '#284854',
} as const

export const LinkChevron: React.FC<LinkChevronProps> = ({
  tone = 'dark',
  size = 'md',
  className = '',
}) => {
  const icon = CHEVRON_CONFIG[size]
  const stroke = STROKE_BY_TONE[tone]

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center leading-none ${className}`.trim()}
    >
      <svg
        width={icon.width}
        height={icon.height}
        viewBox={icon.viewBox}
        fill="none"
        className="block"
      >
        <path d={icon.path} stroke={stroke} strokeWidth="1.5" />
      </svg>
    </span>
  )
}
