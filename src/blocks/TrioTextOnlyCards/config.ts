import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const TrioTextOnlyCards: Block = {
  slug: 'trioTextOnlyCards',
  dbName: 'trio_txt_cards',
  imageURL: '/block-thumbnails/trio-text-only-cards.png',
  imageAltText: 'Three text-only cards with headings and descriptions',
  interfaceName: 'TrioTextOnlyCardsBlock',
  labels: {
    singular: 'Trio Text Only Cards',
    plural: 'Trio Text Only Cards',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'introduction',
              type: 'richText',
              label: 'Introduction',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                },
              }),
            },
            linkGroup({
              appearances: ['default', 'outline', 'arrow'],
              overrides: {
                maxRows: 2,
              },
            }),
            {
              name: 'image',
              type: 'upload',
              label: 'Image',
              relationTo: 'media',
            },
            {
              name: 'mobileImage',
              type: 'upload',
              label: 'Mobile Image',
              relationTo: 'media',
              admin: {
                description: 'Optional image for mobile. Falls back to Image if not set.',
              },
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Cards',
              minRows: 1,
              maxRows: 3,
              required: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description: 'Card heading (e.g. "Keep your roadmap")',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  admin: {
                    description: 'Highlighted subtitle text (shown in gold/accent color)',
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
                },
                link({
                  appearances: false,
                  overrides: {
                    admin: {
                      description: 'Optional link for this card',
                    },
                  },
                }),
                {
                  name: 'style',
                  type: 'select',
                  defaultValue: 'light',
                  options: [
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                  ],
                  admin: {
                    description: 'Card style variant',
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
