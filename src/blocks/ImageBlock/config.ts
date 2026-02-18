import type { Block } from 'payload'

import { blockSettings } from '@/fields/blockSettings'

export const ImageBlock: Block = {
  slug: 'imageBlock',
  imageURL: '/block-thumbnails/image.png',
  imageAltText: 'Image block with max width and alignment controls',
  interfaceName: 'ImageBlock',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'maxWidth',
              type: 'select',
              defaultValue: 'max-w-4xl',
              label: 'Max Width',
              options: [
                { label: '3XL — 768px', value: 'max-w-3xl' },
                { label: '4XL — 896px', value: 'max-w-4xl' },
                { label: '5XL — 1024px', value: 'max-w-5xl' },
                { label: '6XL — 1152px', value: 'max-w-6xl' },
                { label: 'None (full width)', value: 'none' },
              ],
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'center',
              label: 'Alignment',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
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
              defaultPaddingTop: 'md',
              defaultPaddingBottom: 'md',
            }),
          ],
        },
      ],
    },
  ],
}
