import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateNewsSettings } from './hooks/revalidateNewsSettings'

export const NewsSettings: GlobalConfig = {
  slug: 'news-settings',
  label: 'News Settings',
  admin: {
    group: 'News',
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
        description: 'Select up to 4 categories to show as filter pills on the news page. If none are selected, all categories are shown.',
      },
    },
    {
      name: 'featuredPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      maxRows: 5,
      label: 'Featured Posts',
      admin: {
        description: 'Select up to 5 posts to feature on the news page.',
      },
    },
    {
      name: 'postCta',
      type: 'group',
      label: 'Post CTA',
      admin: {
        description: 'Call-to-action displayed within blog posts.',
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
        link({
          appearances: false,
          overrides: {
            name: 'link',
            label: 'Link',
          },
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateNewsSettings],
  },
}
