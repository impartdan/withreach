import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
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
                  return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                },
              }),
              label: 'Description',
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
