import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { blockSettings } from '@/fields/blockSettings'

export const CtaSmall: Block = {
  slug: 'ctaSmall',
  imageURL: '/block-thumbnails/cta-small.png',
  imageAltText: 'Small CTA cards side by side with headings and buttons',
  interfaceName: 'CtaSmallBlock',
  labels: {
    singular: 'CTA Small',
    plural: 'CTA Small',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'cards',
              type: 'array',
              label: 'CTA Cards',
              minRows: 1,
              maxRows: 2,
              required: true,
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
                    },
                  }),
                },
                link({
                  appearances: ['default', 'outline', 'arrow'],
                }),
                {
                  name: 'background',
                  type: 'select',
                  defaultValue: 'none',
                  label: 'Card Background',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Color', value: 'color' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Image', value: 'image' },
                  ],
                },
                {
                  name: 'backgroundColor',
                  type: 'select',
                  label: 'Background Color',
                  admin: {
                    condition: (_, s) => ['color', 'image'].includes(s?.background),
                  },
                  options: [
                    { label: 'Off White', value: 'brand-off-white' },
                    { label: 'Linen', value: 'brand-linen' },
                    { label: 'Black', value: 'brand-black' },
                    { label: 'White', value: 'brand-white' },
                    { label: 'Olive', value: 'brand-olive' },
                    { label: 'Gray', value: 'brand-gray' },
                    { label: 'Purple', value: 'brand-purple' },
                    { label: 'Peach', value: 'brand-peach' },
                    { label: 'Green', value: 'brand-green' },
                    { label: 'Blue', value: 'brand-blue' },
                    { label: 'Blue Light', value: 'brand-blue-light' },
                  ],
                },
                {
                  name: 'gradientFrom',
                  type: 'select',
                  label: 'Gradient From',
                  admin: {
                    condition: (_, s) => s?.background === 'gradient',
                  },
                  options: [
                    { label: 'Off White', value: 'brand-off-white' },
                    { label: 'Linen', value: 'brand-linen' },
                    { label: 'Black', value: 'brand-black' },
                    { label: 'White', value: 'brand-white' },
                    { label: 'Olive', value: 'brand-olive' },
                    { label: 'Gray', value: 'brand-gray' },
                    { label: 'Purple', value: 'brand-purple' },
                    { label: 'Peach', value: 'brand-peach' },
                    { label: 'Green', value: 'brand-green' },
                    { label: 'Blue', value: 'brand-blue' },
                    { label: 'Blue Light', value: 'brand-blue-light' },
                  ],
                },
                {
                  name: 'gradientTo',
                  type: 'select',
                  label: 'Gradient To',
                  admin: {
                    condition: (_, s) => s?.background === 'gradient',
                  },
                  options: [
                    { label: 'Off White', value: 'brand-off-white' },
                    { label: 'Linen', value: 'brand-linen' },
                    { label: 'Black', value: 'brand-black' },
                    { label: 'White', value: 'brand-white' },
                    { label: 'Olive', value: 'brand-olive' },
                    { label: 'Gray', value: 'brand-gray' },
                    { label: 'Purple', value: 'brand-purple' },
                    { label: 'Peach', value: 'brand-peach' },
                    { label: 'Green', value: 'brand-green' },
                    { label: 'Blue', value: 'brand-blue' },
                    { label: 'Blue Light', value: 'brand-blue-light' },
                  ],
                },
                {
                  name: 'gradientDirection',
                  type: 'select',
                  defaultValue: 'down',
                  label: 'Gradient Direction',
                  admin: {
                    condition: (_, s) => s?.background === 'gradient',
                  },
                  options: [
                    { label: 'Down', value: 'down' },
                    { label: 'Right', value: 'right' },
                  ],
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background Image',
                  admin: {
                    condition: (_, s) => s?.background === 'image',
                  },
                },
                {
                  name: 'backgroundImagePosition',
                  type: 'select',
                  defaultValue: 'center',
                  label: 'Image Position',
                  admin: {
                    condition: (_, s) => s?.background === 'image',
                  },
                  options: [
                    { label: 'Center', value: 'center' },
                    { label: 'Top', value: 'top' },
                    { label: 'Bottom', value: 'bottom' },
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' },
                  ],
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
