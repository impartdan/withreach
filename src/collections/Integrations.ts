import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icon',
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'URL to the integration website or documentation',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body',
      admin: {
        description: 'Detailed content about the integration',
      },
    },
    {
      name: 'features',
      type: 'richText',
      label: 'Features',
      admin: {
        description: 'Key features of the integration',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'integration-categories',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}
