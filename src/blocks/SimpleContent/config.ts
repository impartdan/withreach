import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const SimpleContent: Block = {
  slug: 'simpleContent',
  imageURL: '/block-thumbnails/simple-content.png',
  imageAltText: 'Heading with content steps and images on the side',
  interfaceName: 'SimpleContentBlock',
  labels: {
    singular: 'Simple Content',
    plural: 'Simple Contents',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Content Steps',
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
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      maxRows: 3,
      admin: {
        description: 'Optional images displayed on the right side',
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
