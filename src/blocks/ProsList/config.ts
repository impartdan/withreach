import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const ProsList: Block = {
  slug: 'prosList',
  imageURL: '/block-thumbnails/pros-list.png',
  imageAltText: 'Two-column comparison with pros list and solution text',
  interfaceName: 'ProsListBlock',
  labels: {
    singular: 'Pros List',
    plural: 'Pros Lists',
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
              admin: {
                description: 'Main heading above the two columns',
              },
            },
            {
              name: 'prosHeading',
              type: 'text',
              admin: {
                description:
                  'Heading for the pros/benefits column (e.g. "Correct tax handling leads to:")',
              },
            },
            {
              name: 'prosItems',
              type: 'array',
              label: 'Pros Items',
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
