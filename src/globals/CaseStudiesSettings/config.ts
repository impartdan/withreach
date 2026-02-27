import type { GlobalConfig } from 'payload'

import { revalidateCaseStudiesSettings } from './hooks/revalidateCaseStudiesSettings'

export const CaseStudiesSettings: GlobalConfig = {
  slug: 'case-studies-settings',
  label: 'Case Studies Settings',
  admin: {
    group: 'Case Studies',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'featuredCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      maxRows: 4,
      label: 'Featured Categories',
      admin: {
        description: 'Select up to 4 categories to show as filter pills on the case studies page. If none are selected, no pills are shown.',
      },
    },
    {
      name: 'featuredCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      maxRows: 5,
      label: 'Featured Case Studies',
      admin: {
        description: 'Select up to 5 case studies to feature on the case studies page.',
      },
    },
    {
      name: 'caseStudyCta',
      type: 'group',
      label: 'Case Study CTA',
      admin: {
        description: 'Sticky call-to-action sidebar displayed on every case study page.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'primaryLink',
          type: 'group',
          label: 'Primary Link',
          admin: {
            hideGutter: true,
            description: 'Optional call-to-action link (e.g., "Contact sales").',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  admin: {
                    layout: 'horizontal',
                    width: '50%',
                  },
                  defaultValue: 'reference',
                  options: [
                    { label: 'Internal link', value: 'reference' },
                    { label: 'Custom URL', value: 'custom' },
                  ],
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  admin: {
                    style: { alignSelf: 'flex-end' },
                    width: '50%',
                  },
                  label: 'Open in new tab',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'reference',
                  type: 'relationship',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'reference',
                  },
                  label: 'Document to link to',
                  relationTo: ['pages', 'posts', 'case-studies'],
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'custom',
                  },
                  label: 'Custom URL',
                },
                {
                  name: 'label',
                  type: 'text',
                  admin: { width: '50%' },
                  label: 'Label',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCaseStudiesSettings],
  },
}
