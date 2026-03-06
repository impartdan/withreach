import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const RichTextButtons: Block = {
  slug: 'buttonGroup',
  interfaceName: 'RichTextButtonGroupBlock',
  labels: {
    singular: 'Button Group',
    plural: 'Button Groups',
  },
  fields: [
    {
      name: 'alignment',
      type: 'select',
      label: 'Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        label: 'Buttons',
        maxRows: 2,
      },
    }),
  ],
}
