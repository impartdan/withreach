import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { createParentField, createBreadcrumbsField } from '@payloadcms/plugin-nested-docs'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    createParentField('categories'),
    createBreadcrumbsField('categories'),
    slugField({
      position: undefined,
    }),
  ],
}
