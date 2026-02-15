import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Home Hero',
          value: 'homeHero',
        },
        {
          label: 'Solutions Hero',
          value: 'solutionsHero',
        },
        {
          label: 'Partner Hero',
          value: 'partnerHero',
        },
        {
          label: 'Text Hero',
          value: 'textHero',
        },
        {
          label: 'Support Hero',
          value: 'supportHero',
        },
      ],
      required: true,
    },
    // Shared rich text field – used by all hero types
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => type !== 'none',
      },
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
    // Shared links – used by homeHero, textHero, supportHero
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) =>
            ['homeHero', 'textHero', 'supportHero'].includes(type),
        },
      },
    }),
    // Shared media upload – used by homeHero, solutionsHero, partnerHero, supportHero
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['homeHero', 'solutionsHero', 'partnerHero', 'supportHero'].includes(type),
      },
      relationTo: 'media',
    },
    // Video – homeHero only (optional video background)
    {
      name: 'video',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
      filterOptions: {
        mimeType: {
          contains: 'mp4',
        },
      },
      relationTo: 'media',
    },
    // Solutions Hero – feature image (inside the card below the hero area)
    {
      name: 'featureImage',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => type === 'solutionsHero',
      },
      label: 'Feature Image',
      relationTo: 'media',
    },
    // Solutions Hero – feature content (text beside the feature image)
    {
      name: 'featureContent',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => type === 'solutionsHero',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Feature Content',
    },
    // Partner Hero – cards array
    {
      name: 'partnerCards',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'partnerHero',
      },
      label: 'Partner Cards',
      maxRows: 4,
      dbName: 'hero_p_cards',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Label',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link Text',
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Link URL',
        },
      ],
    },
    // Text Hero – optional logo images
    {
      name: 'logoOne',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => type === 'textHero',
      },
      label: 'Logo One',
      relationTo: 'media',
    },
    {
      name: 'logoTwo',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => type === 'textHero',
      },
      label: 'Logo Two',
      relationTo: 'media',
    },
  ],
  label: false,
}
