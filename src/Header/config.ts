import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      label: 'Menu Items',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'dropdown',
          options: [
            {
              label: 'Dropdown',
              value: 'dropdown',
            },
            {
              label: 'Link',
              value: 'link',
            },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        // Link configuration
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'link',
            },
          },
        }),
        // Dropdown configuration
        {
          name: 'dropdownLabel',
          type: 'text',
          label: 'Dropdown Label',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
        },
        {
          name: 'dropdown',
          type: 'group',
          label: 'Dropdown Content',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
          fields: [
            {
              name: 'layout',
              type: 'select',
              defaultValue: 'basic',
              options: [
                {
                  label: 'Basic',
                  value: 'basic',
                },
                {
                  label: 'Nav with Images',
                  value: 'navWithImages',
                },
              ],
            },
            // Basic layout - just links
            {
              name: 'childLinks',
              type: 'array',
              label: 'Child Links',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'basic',
              },
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
            // Nav with images layout
            {
              name: 'navWithImagesLinks',
              type: 'array',
              label: 'Links with Images',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'navWithImages',
              },
              fields: [
                link({
                  appearances: false,
                }),
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image',
                },
              ],
            },
          ],
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'additionalLinks',
      type: 'array',
      label: 'Additional Links',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'link',
          options: [
            {
              label: 'Link Button Style',
              value: 'link',
            },
            {
              label: 'Primary Button Style',
              value: 'primary',
            },
          ],
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
