import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const StatsText: Block = {
  slug: 'statsText',
  imageURL: '/block-thumbnails/stats-text.png',
  imageAltText: 'Statistics grid with heading and description text',
  interfaceName: 'StatsTextBlock',
  labels: {
    singular: 'Stats Text',
    plural: 'Stats Text',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'The stat value (e.g. "200+", "$XXM")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'The stat label (e.g. "Markets")',
          },
        },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading displayed next to the stats',
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
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      defaultPaddingTop: 'lg',
      defaultPaddingBottom: 'lg',
    }),
  ],
}
