import type { Block } from 'payload'

export const LogoList: Block = {
  slug: 'logoList',
  interfaceName: 'LogoListBlock',
  labels: {
    singular: 'Logo List',
    plural: 'Logo Lists',
  },
  fields: [
    {
      name: 'logos',
      type: 'array',
      label: 'Logos',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          admin: {
            description: 'Alternative text for accessibility',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          admin: {
            description: 'Optional URL to link to when logo is clicked',
          },
        },
      ],
    },
  ],
}
