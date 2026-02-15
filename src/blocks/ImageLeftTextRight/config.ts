import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const ImageLeftTextRight: Block = {
  slug: 'imageLeftTextRight',
  dbName: 'img_left_txt',
  imageURL: '/block-thumbnails/image-left-text-right.png',
  imageAltText: 'Dark background with images left and text items right',
  interfaceName: 'ImageLeftTextRightBlock',
  labels: {
    singular: 'Image Left Text Right',
    plural: 'Image Left Text Rights',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Images displayed on the left side',
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
    {
      name: 'items',
      type: 'array',
      label: 'Content Items',
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
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      defaultPaddingTop: 'lg',
      defaultPaddingBottom: 'lg',
    }),
  ],
}
