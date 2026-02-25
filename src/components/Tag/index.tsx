import React from 'react'
import { cn } from '@/utilities/ui'

interface TagProps {
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'primary', className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-2 text-[14px] font-normal whitespace-nowrap',
        variant === 'primary' && 'bg-brand-white text-brand-black border border-brand-black/30',
        variant === 'secondary' && 'border border-brand-linen text-brand-black bg-brand-linen ',
        className,
      )}
    >
      {label}
    </span>
  )
}
