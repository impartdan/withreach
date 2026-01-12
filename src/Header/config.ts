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
                {
                  label: 'Featured with List',
                  value: 'featuredWithList',
                },
                {
                  label: 'Two-Column with Showcase',
                  value: 'twoColumnShowcase',
                },
                {
                  label: 'Featured Integrations',
                  value: 'featuredIntegrations',
                },
                {
                  label: 'Content Grid',
                  value: 'contentGrid',
                },
                {
                  label: 'Simple Links with Feature',
                  value: 'simpleLinksWithFeature',
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
            // Featured with List layout
            {
              name: 'fwlItems',
              type: 'array',
              label: 'Left Column Items',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'featuredWithList',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'fwlCard',
              type: 'group',
              label: 'Featured Card (Right Column)',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'featuredWithList',
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Heading',
                },
                {
                  name: 'callToActionText',
                  type: 'text',
                  label: 'Call to Action Text',
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background Image',
                },
                link({
                  appearances: false,
                }),
              ],
            },
            // Two-Column with Showcase layout
            {
              name: 'tcsItems',
              type: 'array',
              label: 'Left Column Items',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'twoColumnShowcase',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'centerImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Center Decorative Image',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'twoColumnShowcase',
              },
            },
            {
              name: 'tcsCard',
              type: 'group',
              label: 'Showcase Card (Right Column)',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'twoColumnShowcase',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Card Image',
                },
                {
                  name: 'tags',
                  type: 'array',
                  label: 'Category Tags',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                      label: 'Tag',
                    },
                  ],
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Heading',
                },
                link({
                  appearances: false,
                }),
              ],
            },
            // Featured Integrations layout
            {
              name: 'fiItems',
              type: 'array',
              label: 'Left Column Items',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'featuredIntegrations',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'fiTitle',
              type: 'text',
              label: 'Integrations Section Title',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'featuredIntegrations',
              },
            },
            {
              name: 'fiIntegrations',
              type: 'array',
              label: 'Integration Cards',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'featuredIntegrations',
              },
              fields: [
                {
                  name: 'integration',
                  type: 'relationship',
                  relationTo: 'integrations',
                  label: 'Integration',
                },
                {
                  name: 'customName',
                  type: 'text',
                  label: 'Custom Name (optional, overrides integration name)',
                },
                {
                  name: 'customLogo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Custom Logo (optional, overrides integration logo)',
                },
                link({
                  appearances: false,
                  overrides: {
                    label: 'Explore Link',
                  },
                }),
              ],
            },
            // Content Grid layout
            {
              name: 'cgItems',
              type: 'array',
              label: 'Left Column Items',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'contentGrid',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'cgCards',
              type: 'array',
              label: 'Content Cards (Right Column)',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'contentGrid',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Card Image',
                },
                {
                  name: 'tags',
                  type: 'array',
                  label: 'Category Tags',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                      label: 'Tag',
                    },
                  ],
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Heading',
                },
                link({
                  appearances: false,
                }),
              ],
            },
            // Simple Links with Feature layout
            {
              name: 'slfLinks',
              type: 'array',
              label: 'Simple Links (Left Column)',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'simpleLinksWithFeature',
              },
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'slfArticle',
              type: 'group',
              label: 'Featured Article (Right Column)',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'simpleLinksWithFeature',
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Heading',
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background Image',
                },
                link({
                  appearances: false,
                }),
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
