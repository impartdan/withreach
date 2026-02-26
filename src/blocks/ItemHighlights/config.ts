import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const ItemHighlights: Block = {
  slug: 'itemHighlights',
  imageURL: '/block-thumbnails/item-highlights.png',
  imageAltText: 'Grid of highlight items with icons, titles and descriptions',
  interfaceName: 'ItemHighlightsBlock',
  labels: {
    singular: 'Item Highlights',
    plural: 'Item Highlights',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '4',
              options: [
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
            },
            {
              name: 'items',
              type: 'array',
              label: 'Items',
              minRows: 1,
              maxRows: 12,
              required: true,
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Icon for this highlight item',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings({
              enablePadding: true,
              enableBackground: true,
              defaultPaddingTop: 'lg',
              defaultPaddingBottom: 'lg',
            }),
          ],
        },
      ],
    },
  ],
}
