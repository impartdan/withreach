import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const PeopleIndex: Block = {
  slug: 'peopleIndex',
  imageURL: '/block-thumbnails/people-index.png',
  imageAltText: 'Team members grid with photos, names, titles and LinkedIn links',
  interfaceName: 'PeopleIndexBlock',
  labels: {
    singular: 'People Index',
    plural: 'People Indexes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our team',
    },
    {
      name: 'people',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Job title and/or team (e.g. "Senior Engineer / Platform")',
          },
        },
        {
          name: 'linkedinUrl',
          type: 'text',
          admin: {
            description: 'LinkedIn profile URL',
          },
        },
      ],
    },
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      defaultPaddingTop: 'lg',
      defaultPaddingBottom: 'lg',
    }),
  ],
}
