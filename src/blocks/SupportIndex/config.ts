import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { blockSettings } from '@/fields/blockSettings'

export const SupportIndex: Block = {
  slug: 'supportIndex',
  imageURL: '/block-thumbnails/support-index.png',
  imageAltText: 'Resource cards grid with titles, descriptions and links',
  interfaceName: 'SupportIndexBlock',
  labels: {
    singular: 'Support Index',
    plural: 'Support Indexes',
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
              name: 'cards',
              type: 'array',
              label: 'Resource Cards',
              minRows: 1,
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
                link({
                  appearances: false,
                  overrides: {
                    admin: {
                      description: 'Link for this resource card',
                    },
                  },
                }),
              ],
            },
            {
              name: 'footerContent',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                },
              }),
              label: 'Footer Content',
              admin: {
                description: 'Optional content displayed below the cards (e.g. contact info, addresses)',
              },
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
