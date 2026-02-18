import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const ConsList: Block = {
  slug: 'consList',
  imageURL: '/block-thumbnails/cons-list.png',
  imageAltText: 'Two-column comparison with cons list and solution text',
  interfaceName: 'ConsListBlock',
  labels: {
    singular: 'Cons List',
    plural: 'Cons Lists',
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
                description: 'Main heading above the two columns',
              },
            },
            {
              name: 'consHeading',
              type: 'text',
              required: true,
              admin: {
                description: 'Heading for the cons/problems column (e.g. "Incorrect tax handling leads to:")',
              },
            },
            {
              name: 'consItems',
              type: 'array',
              label: 'Cons Items',
              minRows: 1,
              required: true,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'solutionText',
              type: 'richText',
              required: true,
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
              label: 'Solution Text',
              admin: {
                description: 'Text for the solution/positive column on the right',
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
              defaultPaddingTop: 'lg',
              defaultPaddingBottom: 'lg',
            }),
          ],
        },
      ],
    },
  ],
}
