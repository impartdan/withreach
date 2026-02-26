import type { Block } from 'payload'

import { blockSettings } from '@/fields/blockSettings'

export const Integrations: Block = {
  slug: 'integrations',
  imageURL: '/block-thumbnails/integrations.png',
  imageAltText: 'Integration partner cards grid with logos, names and descriptions',
  interfaceName: 'IntegrationsBlock',
  labels: {
    singular: 'Integrations',
    plural: 'Integrations',
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
              defaultValue: 'Featured integrations',
              required: true,
            },
            {
              name: 'selectedIntegrations',
              type: 'relationship',
              relationTo: 'integrations',
              hasMany: true,
              admin: {
                description: 'Select specific integrations to display. Leave empty to show all integrations.',
              },
            },
            {
              name: 'pinnedIntegrations',
              type: 'relationship',
              relationTo: 'integrations',
              hasMany: true,
              admin: {
                description: 'Select integrations to pin at the top. Pinned integrations will always appear first, regardless of sorting.',
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
