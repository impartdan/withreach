import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const InsetDualImage: Block = {
  slug: 'insetDualImage',
  imageURL: '/block-thumbnails/inset-dual-image.png',
  imageAltText: 'Inset card with text left and dual images side by side on right',
  interfaceName: 'InsetDualImageBlock',
  labels: {
    singular: 'Inset Dual Image',
    plural: 'Inset Dual Images',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
              admin: {
                description: 'Description text below the heading',
              },
            },
            linkGroup({
              appearances: ['default', 'outline', 'arrow'],
              overrides: {
                maxRows: 3,
              },
            }),
            {
              name: 'images',
              type: 'array',
              label: 'Images',
              minRows: 2,
              maxRows: 2,
              required: true,
              admin: {
                description: 'Add exactly 2 images to display side by side',
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
