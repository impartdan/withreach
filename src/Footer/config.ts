import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navColumns',
      type: 'array',
      label: 'Footer Navigation',
      fields: [
        {
          name: 'menus',
          type: 'array',
          label: 'Menus',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Menu title',
              required: true,
            },
            {
              name: 'items',
              type: 'array',
              label: 'Links',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'variant',
              type: 'select',
              label: 'Menu style',
              defaultValue: 'primary',
              required: true,
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
              ],
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'badges',
      type: 'array',
      label: 'Badges',
      fields: [
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
