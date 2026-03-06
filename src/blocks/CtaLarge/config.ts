import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { OliveTextFeature } from '@/lexical/olive-text/feature.server'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const CtaLarge: Block = {
  slug: 'ctaLarge',
  imageURL: '/block-thumbnails/cta-large.png',
  imageAltText: 'Large centered call-to-action with heading and button',
  interfaceName: 'CtaLargeBlock',
  labels: {
    singular: 'CTA Large',
    plural: 'CTA Large',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'label',
              type: 'text',
              admin: {
                description: 'Small label text above the heading (e.g. "Connect with us")',
              },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    OliveTextFeature(),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: 'Description',
            },
            {
              name: 'maxWidth',
              type: 'select',
              defaultValue: 'max-w-3xl',
              label: 'Content Max Width',
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
            linkGroup({
              appearances: ['default', 'outline', 'arrow'],
              overrides: {
                maxRows: 2,
              },
            }),
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings({
              enablePadding: true,
              enableBackground: true,
              defaultPaddingTop: '2xl',
              defaultPaddingBottom: '2xl',
            }),
          ],
        },
      ],
    },
  ],
}
