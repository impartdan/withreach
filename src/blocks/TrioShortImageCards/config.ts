import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const TrioShortImageCards: Block = {
  slug: 'trioShortImageCards',
  dbName: 'trio_short_img',
  imageURL: '/block-thumbnails/trio-short-image-cards.png',
  imageAltText: 'Three cards with landscape images, titles, descriptions and links',
  interfaceName: 'TrioShortImageCardsBlock',
  labels: {
    singular: 'Trio Short Image Cards',
    plural: 'Trio Short Image Cards',
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
                  required: true,
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
