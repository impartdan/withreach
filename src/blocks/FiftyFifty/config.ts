import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const FiftyFifty: Block = {
  slug: 'fiftyFifty',
  imageURL: '/block-thumbnails/fifty-fifty.png',
  imageAltText: 'Split layout with text on one side and image on the other',
  interfaceName: 'FiftyFiftyBlock',
  labels: {
    singular: '50/50',
    plural: '50/50s',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
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
        maxRows: 2,
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image or screenshot displayed on the opposite side of the text',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'textLeft',
      options: [
        { label: 'Text Left / Image Right', value: 'textLeft' },
        { label: 'Image Left / Text Right', value: 'imageLeft' },
      ],
    },
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      enableBackgroundImage: true,
      defaultPaddingTop: 'lg',
      defaultPaddingBottom: 'lg',
    }),
  ],
}
