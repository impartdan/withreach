import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Globals',
  },
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
              defaultValue: 'featuredWithList',
              options: [
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
                      name: 'tcsContentType',
                      type: 'radio',
                      label: 'Content Type',
                      defaultValue: 'posts',
                      options: [
                        {
                          label: 'Posts (News)',
                          value: 'posts',
                        },
                        {
                          label: 'Case Studies',
                          value: 'case-studies',
                        },
                      ],
                      admin: {
                        layout: 'horizontal',
                      },
                    },
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
                        condition: (_, siblingData) =>
                          siblingData?.tcsMode === 'manual' &&
                          (siblingData?.tcsContentType === 'posts' ||
                            !siblingData?.tcsContentType),
                      },
                    },
                    {
                      name: 'tcsCaseStudy',
                      type: 'relationship',
                      relationTo: 'case-studies',
                      label: 'Select Case Study',
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData?.tcsMode === 'manual' &&
                          siblingData?.tcsContentType === 'case-studies',
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
                  label: 'Right Column Posts',
                  admin: {
                    width: '50%',
                  },
                  fields: [
                    {
                      name: 'cgMode',
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
                      name: 'cgPosts',
                      type: 'relationship',
                      relationTo: 'posts',
                      label: 'Select Posts',
                      hasMany: true,
                      maxRows: 2,
                      admin: {
                        condition: (_, siblingData) => siblingData?.cgMode === 'manual',
                      },
                    },
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
