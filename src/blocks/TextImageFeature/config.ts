import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const TextImageFeature: Block = {
  slug: 'textImageFeature',
  interfaceName: 'TextImageFeatureBlock',
  imageURL: '/block-thumbnails/text-image-feature.png',
  imageAltText: 'Text and image feature section with heading, description, buttons and images',
  labels: {
    singular: 'Text Image Feature',
    plural: 'Text Image Features',
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
                description: 'Main heading for the feature section',
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
                description: 'Description text for the feature',
              },
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
              maxRows: 2,
              required: true,
              admin: {
                description: 'Add 1-2 images to display alongside the text',
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
          label: 'Layout',
          fields: [
            {
              name: 'imagePosition',
              type: 'select',
              defaultValue: 'right',
              options: [
                {
                  label: 'Left',
                  value: 'left',
                },
                {
                  label: 'Right',
                  value: 'right',
                },
              ],
              admin: {
                description: 'Position of images relative to text content',
              },
            },
            {
              name: 'contentAlignment',
              type: 'select',
              defaultValue: 'left',
              options: [
                {
                  label: 'Left',
                  value: 'left',
                },
                {
                  label: 'Center',
                  value: 'center',
                },
                {
                  label: 'Right',
                  value: 'right',
                },
              ],
              admin: {
                description: 'Alignment of text content',
              },
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings({
              enablePadding: true,
              enableBackground: true,
              enableBackgroundImage: true,
              enableBackgroundVideo: true,
              defaultPaddingTop: 'large',
              defaultPaddingBottom: 'large',
            }),
          ],
        },
      ],
    },
  ],
}
