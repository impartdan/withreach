import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const PageTeaser: Block = {
  slug: 'pageTeaser',
  imageURL: '/block-thumbnails/page-teaser.png',
  imageAltText: 'Dark background teaser with text and illustration',
  interfaceName: 'PageTeaserBlock',
  labels: {
    singular: 'Page Teaser',
    plural: 'Page Teasers',
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
                description: 'Main heading for the teaser',
              },
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Description',
            },
            linkGroup({
              appearances: ['default', 'outline', 'arrow'],
              overrides: {
                maxRows: 2,
              },
            }),
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Illustration or image displayed on the right side',
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
