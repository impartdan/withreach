import type { Block } from 'payload'

export const ChecklistList: Block = {
  slug: 'checklistList',
  labels: {
    singular: 'Checklist',
    plural: 'Checklists',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          required: true,
        },
      ],
    },
  ],
  interfaceName: 'ChecklistListBlock',
}
