import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { blockSettings } from '@/fields/blockSettings'

export const CardGrid: Block = {
  slug: 'cardGrid',
  imageURL: '/block-thumbnails/card-grid.png',
  imageAltText: 'Grid of cards with title, description and optional link',
  interfaceName: 'CardGridBlock',
  labels: {
    singular: 'Card Grid',
    plural: 'Card Grids',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: {
                description: 'Optional section heading displayed above the cards',
              },
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Cards',
              minRows: 1,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Card title',
                  },
                },
                {
                  name: 'description',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                    },
                  }),
                  admin: {
                    description: 'Optional card description',
                  },
                },
                link({
                  appearances: false,
                  overrides: {
                    admin: {
                      description: 'Optional link for this card',
                    },
                  },
                }),
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
