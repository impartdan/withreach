'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['menuItems']>[number]>()

  let label = 'Menu Item'

  if (data?.data) {
    const rowNum = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
    
    if (data.data.type === 'link' && data.data.link?.label) {
      label = `${rowNum}: ${data.data.link.label} (Link)`
    } else if (data.data.type === 'dropdown' && data.data.dropdownLabel) {
      const layout = data.data.dropdown?.layout === 'navWithImages' ? 'with Images' : 'Basic'
      label = `${rowNum}: ${data.data.dropdownLabel} (Dropdown - ${layout})`
    } else {
      label = `${rowNum}: Untitled`
    }
  }

  return <div>{label}</div>
}
