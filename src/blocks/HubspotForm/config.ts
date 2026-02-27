import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { blockSettings } from '@/fields/blockSettings'

export const HubspotFormBlock: Block = {
  slug: 'hubspotForm',
  imageURL: '/block-thumbnails/hubspot-form.png',
  imageAltText: 'HubSpot form with fields for name, email, website and more',
  interfaceName: 'HubspotFormBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: false,
            },
            {
              name: 'maxWidth',
              type: 'select',
              defaultValue: 'max-w-xl',
              label: 'Max Width',
              options: [
                { label: 'SM (384px)', value: 'max-w-sm' },
                { label: 'MD (448px)', value: 'max-w-md' },
                { label: 'LG (512px)', value: 'max-w-lg' },
                { label: 'XL (576px)', value: 'max-w-xl' },
                { label: '2XL (672px)', value: 'max-w-2xl' },
                { label: '3XL (768px)', value: 'max-w-3xl' },
                { label: '4XL (896px)', value: 'max-w-4xl' },
                { label: '5XL (1024px)', value: 'max-w-5xl' },
                { label: '6XL (1152px)', value: 'max-w-6xl' },
                { label: 'None (full width)', value: 'none' },
              ],
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'left',
              label: 'Block Alignment',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ],
            },
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
              name: 'disableHubspotStyles',
              type: 'checkbox',
              label: 'Disable HubSpot Default Styles',
              defaultValue: false,
              admin: {
                description: "Check this to disable HubSpot's default CSS and use only your custom styles",
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
