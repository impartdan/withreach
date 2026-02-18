import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { blockSettings } from '@/fields/blockSettings'

export const ItemHighlightsWithIntro: Block = {
  slug: 'itemHighlightsWithIntro',
  dbName: 'item_hl_intro',
  imageURL: '/block-thumbnails/item-highlights-with-intro.png',
  imageAltText: 'Dark background with centered intro and highlight items grid',
  interfaceName: 'ItemHighlightsWithIntroBlock',
  labels: {
    singular: 'Item Highlights With Intro',
    plural: 'Item Highlights With Intros',
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
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              admin: {
                description: 'Short description below the heading',
              },
            },
            {
              name: 'items',
              type: 'array',
              label: 'Highlight Items',
              minRows: 1,
              maxRows: 6,
              required: true,
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Icon for this item',
                  },
                },
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
                link({
                  appearances: false,
                  overrides: {
                    admin: {
                      description: 'Optional link for this item',
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
              defaultPaddingTop: 'xl',
              defaultPaddingBottom: 'xl',
            }),
          ],
        },
      ],
    },
  ],
}
