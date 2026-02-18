import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const FaqCenter: Block = {
  slug: 'faqCenter',
  imageURL: '/block-thumbnails/faq-center.png',
  imageAltText: 'Dark background centered FAQ accordion section',
  interfaceName: 'FaqCenterBlock',
  labels: {
    singular: 'FAQ Center',
    plural: 'FAQ Centers',
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
                description: 'Small label text above the heading',
              },
            },
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
              name: 'faqs',
              type: 'array',
              label: 'FAQ Items',
              minRows: 1,
              required: true,
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'richText',
                  required: true,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                    },
                  }),
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
              defaultPaddingTop: 'xl',
              defaultPaddingBottom: 'xl',
            }),
          ],
        },
      ],
    },
  ],
}
