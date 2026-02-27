import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const ImageLeftTextRight: Block = {
  slug: 'imageLeftTextRight',
  dbName: 'img_left_txt',
  imageURL: '/block-thumbnails/image-left-text-right.png',
  imageAltText: 'Dark background with images left and text items right',
  interfaceName: 'ImageLeftTextRightBlock',
  labels: {
    singular: 'Image Left Text Right',
    plural: 'Image Left Text Rights',
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
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Image displayed on the left side',
              },
            },
            {
              name: 'items',
              type: 'array',
              label: 'Content Items',
              minRows: 1,
              required: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
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
