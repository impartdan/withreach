import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  imageURL: '/block-thumbnails/rich-text.png',
  imageAltText: 'Long-form rich text content for legal and policy pages',
  interfaceName: 'RichTextBlockType',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Texts',
  },
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
      label: 'Content',
      admin: {
        description: 'Long-form rich text content for pages like privacy policies, terms of service, etc.',
      },
    },
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      defaultPaddingTop: 'lg',
      defaultPaddingBottom: 'lg',
    }),
  ],
}
