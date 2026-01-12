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
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'featuredWithList',
              },
              fields: [
                {
                  name: 'fwlItems',
                  type: 'array',
                  label: 'Left Column Items',
                  admin: {
                    width: '50%',
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                    },
                  ],
                },
                {
                  name: 'fwlCard',
                  type: 'group',
                  label: 'Featured Card (Right Column)',
                  admin: {
                    width: '50%',
                  },
                  fields: [
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
            // Two-Column with Showcase layout
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'twoColumnShowcase',
              },
              fields: [
                {
                  name: 'tcsItems',
                  type: 'array',
                  label: 'Left Column Items',
                  admin: {
                    width: '50%',
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Right Column',
                  admin: {
                    width: '50%',
                  },
                  fields: [
                    {
                      name: 'tcsMode',
                      type: 'radio',
                      label: 'Content Mode',
                      defaultValue: 'automatic',
                      options: [
                        {
                          label: 'Automatic',
                          value: 'automatic',
                        },
                        {
                          label: 'Manual',
                          value: 'manual',
                        },
                      ],
                      admin: {
                        layout: 'horizontal',
                      },
                    },
                    {
                      name: 'tcsPost',
                      type: 'relationship',
                      relationTo: 'posts',
                      label: 'Select Post',
                      admin: {
                        condition: (_, siblingData) => siblingData?.tcsMode === 'manual',
                      },
                    },
                  ],
                },
              ],
            },
            // Featured Integrations layout
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'featuredIntegrations',
              },
              fields: [
                {
                  name: 'fiItems',
                  type: 'array',
                  label: 'Left Column Items',
                  admin: {
                    width: '50%',
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                    },
                  ],
                },
                {
                  name: 'fiIntegrations',
                  type: 'relationship',
                  relationTo: 'integrations',
                  label: 'Integrations (Right Column)',
                  hasMany: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            // Content Grid layout
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'contentGrid',
              },
              fields: [
                {
                  name: 'cgItems',
                  type: 'array',
                  label: 'Left Column Items',
                  admin: {
                    width: '50%',
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
                    width: '50%',
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
              ],
            },
            // Simple Links with Feature layout
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData?.layout === 'simpleLinksWithFeature',
              },
              fields: [
                {
                  name: 'slfLinks',
                  type: 'array',
                  label: 'Simple Links (Left Column)',
                  admin: {
                    width: '50%',
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
                    width: '50%',
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
