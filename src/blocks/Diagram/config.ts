import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const Diagram: Block = {
  slug: 'diagram',
  imageURL: '/block-thumbnails/diagram.png',
  imageAltText: 'Centered heading and description with diagram image below',
  interfaceName: 'DiagramBlock',
  labels: {
    singular: 'Diagram',
    plural: 'Diagrams',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading above the diagram',
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
        maxRows: 2,
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Diagram or illustration image',
      },
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
