import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockSettings } from '@/fields/blockSettings'

export const FormBlock2: Block = {
  slug: 'formBlock2',
  imageURL: '/block-thumbnails/form.png',
  imageAltText: 'Form section with heading, description and form fields',
  interfaceName: 'FormBlock2Type',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Heading above the form',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: 'Description',
      admin: {
        description: 'Optional text displayed below the heading',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'Select the form to display',
      },
    },
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      enableBackgroundImage: true,
      defaultPaddingTop: 'xl',
      defaultPaddingBottom: 'xl',
    }),
  ],
}
