import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const Disclaimer: Block = {
  slug: 'disclaimer',
  imageURL: '/block-thumbnails/disclaimer.png',
  imageAltText: 'Compact disclaimer with label and fine print text',
  interfaceName: 'DisclaimerBlock',
  labels: {
    singular: 'Disclaimer',
    plural: 'Disclaimers',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Fine print / Disclaimer:',
      admin: {
        description: 'Label text displayed on the left (e.g. "Fine print / Disclaimer:")',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: 'Disclaimer Text',
    },
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      defaultPaddingTop: 'sm',
      defaultPaddingBottom: 'sm',
    }),
  ],
}
