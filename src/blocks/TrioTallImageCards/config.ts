import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const TrioTallImageCards: Block = {
  slug: 'trioTallImageCards',
  dbName: 'trio_tall_img',
  imageURL: '/block-thumbnails/trio-tall-image-cards.png',
  imageAltText: 'Three cards with tall images, titles and descriptions',
  interfaceName: 'TrioTallImageCardsBlock',
  labels: {
    singular: 'Trio Tall Image Cards',
    plural: 'Trio Tall Image Cards',
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
            linkGroup({
              appearances: ['default', 'outline'],
              overrides: {
                maxRows: 2,
              },
            }),
            {
              name: 'cards',
              type: 'array',
              label: 'Cards',
              minRows: 1,
              maxRows: 3,
              required: true,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'title',
                  type: 'text',
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
                {
                  name: 'link',
                  type: 'text',
                  admin: {
                    description: 'Optional link URL for the card',
                  },
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
