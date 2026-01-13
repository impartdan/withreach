import type { Block } from 'payload'

export const Integrations: Block = {
  slug: 'integrations',
  interfaceName: 'IntegrationsBlock',
  labels: {
    singular: 'Integrations',
    plural: 'Integrations',
  },
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
}
