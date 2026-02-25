import type { Block } from 'payload'

import { blockSettings } from '@/fields/blockSettings'

export const HubspotFormBlock: Block = {
  slug: 'hubspotForm',
  interfaceName: 'HubspotFormBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'formId',
              type: 'text',
              label: 'HubSpot Form ID',
              required: true,
              admin: {
                description: 'Enter the HubSpot form ID (e.g., "12345678-1234-1234-1234-123456789012")',
              },
            },
            {
              name: 'portalId',
              type: 'text',
              label: 'HubSpot Portal ID (Optional)',
              admin: {
                description:
                  'Override the default portal ID from environment variables. Leave empty to use NEXT_PUBLIC_HUBSPOT_PORTAL_ID',
              },
            },
            {
              name: 'formTitle',
              type: 'text',
              label: 'Form Title (Optional)',
              admin: {
                description: 'Optional title to display above the form',
              },
            },
            {
              name: 'disableHubspotStyles',
              type: 'checkbox',
              label: 'Disable HubSpot Default Styles',
              defaultValue: false,
              admin: {
                description: 'Check this to disable HubSpot\'s default CSS and use only your custom styles',
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
  graphQL: {
    singularName: 'HubspotFormBlock',
  },
  labels: {
    plural: 'HubSpot Form Blocks',
    singular: 'HubSpot Form Block',
  },
}
