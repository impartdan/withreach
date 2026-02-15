import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const Checklist: Block = {
  slug: 'checklist',
  imageURL: '/block-thumbnails/checklist.png',
  imageAltText: 'Dark background checklist grid with checkmarks',
  interfaceName: 'ChecklistBlock',
  labels: {
    singular: 'Checklist',
    plural: 'Checklists',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Checklist Items',
      minRows: 1,
      maxRows: 12,
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
        },
      ],
    },
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      defaultPaddingTop: 'xl',
      defaultPaddingBottom: 'xl',
    }),
  ],
}
