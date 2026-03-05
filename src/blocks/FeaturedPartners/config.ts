import type { Block } from 'payload'

import { blockSettings } from '@/fields/blockSettings'

export const FeaturedPartners: Block = {
  slug: 'featuredPartners',
  imageURL: '/block-thumbnails/featured-partners.png',
  imageAltText: 'Featured partner integration cards displayed in a grid with logos, names and descriptions',
  interfaceName: 'FeaturedPartnersBlock',
  labels: {
    singular: 'Featured Partners',
    plural: 'Featured Partners',
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
              defaultValue: 'Featured partners',
              required: true,
            },
            {
              name: 'integrations',
              type: 'relationship',
              relationTo: 'integrations',
              hasMany: true,
              required: true,
              admin: {
                description: 'Select the integrations to feature in this block.',
              },
            },
            {
              name: 'slimLayout',
              type: 'checkbox',
              label: 'Slim layout',
              defaultValue: false,
              admin: {
                description:
                  'Use compact integration link buttons instead of the default featured cards.',
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
