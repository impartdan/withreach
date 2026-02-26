import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { blockSettings } from '@/fields/blockSettings'

export const Content: Block = {
  slug: 'content',
  imageURL: '/block-thumbnails/rich-text.png',
  imageAltText: 'Rich text content block',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Content',
    plural: 'Content',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: false,
            },
            {
              name: 'maxWidth',
              type: 'select',
              defaultValue: 'max-w-xl',
              label: 'Max Width',
              options: [
                { label: 'SM (384px)', value: 'max-w-sm' },
                { label: 'MD (448px)', value: 'max-w-md' },
                { label: 'LG (512px)', value: 'max-w-lg' },
                { label: 'XL (576px)', value: 'max-w-xl' },
                { label: '2XL (672px)', value: 'max-w-2xl' },
                { label: '3XL (768px)', value: 'max-w-3xl' },
                { label: '4XL (896px)', value: 'max-w-4xl' },
                { label: '5XL (1024px)', value: 'max-w-5xl' },
                { label: '6XL (1152px)', value: 'max-w-6xl' },
                { label: 'None (full width)', value: 'none' },
              ],
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'left',
              label: 'Block Alignment',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
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
