import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { blockSettings } from '@/fields/blockSettings'

export const CtaSmall: Block = {
  slug: 'ctaSmall',
  imageURL: '/block-thumbnails/cta-small.png',
  imageAltText: 'Small CTA cards side by side with headings and buttons',
  interfaceName: 'CtaSmallBlock',
  labels: {
    singular: 'CTA Small',
    plural: 'CTA Small',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'cards',
              type: 'array',
              label: 'CTA Cards',
              minRows: 1,
              maxRows: 2,
              required: true,
              fields: [
                {
                  name: 'heading',
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
                  appearances: ['default', 'outline'],
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
