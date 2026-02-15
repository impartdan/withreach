import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const InsetCopyImage: Block = {
  slug: 'insetCopyImage',
  imageURL: '/block-thumbnails/inset-copy-image.png',
  imageAltText: 'Inset card with text left and image collage on right',
  interfaceName: 'InsetCopyImageBlock',
  labels: {
    singular: 'Inset Copy Image',
    plural: 'Inset Copy Images',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading for the section',
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
      label: 'Description',
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 3,
      },
    }),
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 1,
      maxRows: 3,
      required: true,
      admin: {
        description: 'Add images to display in a collage alongside the text',
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
      enableBackgroundImage: true,
      enableBackgroundVideo: true,
      defaultPaddingTop: 'lg',
      defaultPaddingBottom: 'lg',
    }),
  ],
}
