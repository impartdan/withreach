'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['navColumns']>[number]>()

  const firstMenuTitle = data?.data?.menus?.[0]?.title

  const label = firstMenuTitle
    ? `Column ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${firstMenuTitle}`
    : 'Column'

  return <div>{label}</div>
}
