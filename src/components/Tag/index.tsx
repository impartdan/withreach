import React from 'react'
import { cn } from '@/utilities/ui'

interface TagProps {
  label: string
  variant?: 'primary' | 'secondary'
  active?: boolean
  className?: string
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'primary', active = false, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-2 text-[14px] font-normal whitespace-nowrap',
        !active && variant === 'primary' && 'bg-brand-white text-brand-black border border-brand-black/30',
        !active && variant === 'secondary' && 'border border-brand-linen text-brand-black bg-brand-linen',
        active && 'bg-brand-black text-white border border-brand-black',
        className,
      )}
    >
      {label}
    </span>
  )
}
