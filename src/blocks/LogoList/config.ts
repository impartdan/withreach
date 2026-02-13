import type { Block } from 'payload'

import { blockSettings } from '@/fields/blockSettings'

export const LogoList: Block = {
  slug: 'logoList',
  interfaceName: 'LogoListBlock',
  labels: {
    singular: 'Logo List',
    plural: 'Logo Lists',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              admin: {
                description: 'Optional title displayed above the logos',
              },
            },
            {
              name: 'logos',
              type: 'array',
              label: 'Logos',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Alt Text',
                  admin: {
                    description: 'Alternative text for accessibility',
                  },
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Link',
                  admin: {
                    description: 'Optional URL to link to when logo is clicked',
                  },
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
              enableBackgroundImage: true,
              enableBackgroundVideo: true,
              defaultPaddingTop: 'medium',
              defaultPaddingBottom: 'medium',
            }),
          ],
        },
      ],
    },
  ],
}
