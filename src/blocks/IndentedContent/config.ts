import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const IndentedContent: Block = {
  slug: 'indentedContent',
  imageURL: '/block-thumbnails/indented-content.png',
  imageAltText: 'Text content with bullet list and logo icons on the right',
  interfaceName: 'IndentedContentBlock',
  labels: {
    singular: 'Indented Content',
    plural: 'Indented Contents',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description: 'Brief description text below the heading',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Rich Content',
      admin: {
        description: 'Content with bullet points, lists, etc.',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      maxRows: 6,
      admin: {
        description: 'Optional logos or icons displayed on the right',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      defaultPaddingTop: 'lg',
      defaultPaddingBottom: 'lg',
    }),
  ],
}
