import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { blockSettings } from '@/fields/blockSettings'
import { linkGroup } from '@/fields/linkGroup'

const heroRichText: Field = {
  name: 'richText',
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
}

const heroSettings = blockSettings({
  enablePadding: false,
  enableBackground: true,
})

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  imageURL: '/block-thumbnails/hero-home.png',
  imageAltText: 'Full-screen hero with video or image background and centered text',
  interfaceName: 'HomeHeroBlock',
  labels: {
    singular: 'Home Hero',
    plural: 'Home Heroes',
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
              label: 'Title',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtitle',
            },
            heroRichText,
            linkGroup({
              overrides: {
                maxRows: 2,
              },
            }),
          ],
        },
        {
          label: 'Settings',
          fields: [heroSettings],
        },
      ],
    },
  ],
}

export const SolutionsHeroBlock: Block = {
  slug: 'solutionsHero',
  imageURL: '/block-thumbnails/hero-solutions.png',
  imageAltText: 'Hero with blurred background image and overlapping feature card',
  interfaceName: 'SolutionsHeroBlock',
  labels: {
    singular: 'Solutions Hero',
    plural: 'Solutions Heroes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            heroRichText,
            {
              name: 'featureImage',
              type: 'upload',
              label: 'Feature Image',
              relationTo: 'media',
            },
            {
              name: 'featureContent',
              type: 'richText',
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
          ],
        },
        {
          label: 'Settings',
          fields: [heroSettings],
        },
      ],
    },
  ],
}

export const PartnerHeroBlock: Block = {
  slug: 'partnerHero',
  imageURL: '/block-thumbnails/hero-partner.png',
  imageAltText: 'Hero with blurred background image and partner cards grid',
  interfaceName: 'PartnerHeroBlock',
  labels: {
    singular: 'Partner Hero',
    plural: 'Partner Heroes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            heroRichText,
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'partnerCards',
              type: 'array',
              label: 'Partner Cards',
              maxRows: 4,
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
          ],
        },
        {
          label: 'Settings',
          fields: [heroSettings],
        },
      ],
    },
  ],
}

export const TextHeroBlock: Block = {
  slug: 'textHero',
  imageURL: '/block-thumbnails/hero-text.png',
  imageAltText: 'Centered text hero with optional logos and CTA buttons',
  interfaceName: 'TextHeroBlock',
  labels: {
    singular: 'Text Hero',
    plural: 'Text Heroes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            heroRichText,
            linkGroup({
              overrides: {
                maxRows: 2,
              },
            }),
            {
              name: 'logoOne',
              type: 'upload',
              label: 'Logo One',
              relationTo: 'media',
            },
            {
              name: 'logoTwo',
              type: 'upload',
              label: 'Logo Two',
              relationTo: 'media',
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'center',
              label: 'Block Alignment',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ],
            },
          ],
        },
        {
          label: 'Settings',
          fields: [heroSettings],
        },
      ],
    },
  ],
}

export const PlatformHeroBlock: Block = {
  slug: 'platformHero',
  imageURL: '/block-thumbnails/hero-platform.png',
  imageAltText: 'Light background with left-aligned text and illustration on the right',
  interfaceName: 'PlatformHeroBlock',
  labels: {
    singular: 'Platform Hero',
    plural: 'Platform Heroes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            heroRichText,
            linkGroup({
              overrides: {
                maxRows: 2,
              },
            }),
            {
              name: 'media',
              type: 'upload',
              label: 'Illustration',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Settings',
          fields: [heroSettings],
        },
      ],
    },
  ],
}

export const SupportHeroBlock: Block = {
  slug: 'supportHero',
  imageURL: '/block-thumbnails/hero-support.png',
  imageAltText: 'Two-column hero with text and CTA on left, image on right',
  interfaceName: 'SupportHeroBlock',
  labels: {
    singular: 'Support Hero',
    plural: 'Support Heroes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            heroRichText,
            linkGroup({
              overrides: {
                maxRows: 2,
              },
            }),
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Settings',
          fields: [heroSettings],
        },
      ],
    },
  ],
}

export const HubspotFormHeroBlock: Block = {
  slug: 'hubspotFormHero',
  imageURL: '/block-thumbnails/hero-hubspot-form.png',
  imageAltText: 'Full-screen hero with centered heading and embedded HubSpot form',
  interfaceName: 'HubspotFormHeroBlock',
  labels: {
    singular: 'HubSpot Form Hero',
    plural: 'HubSpot Form Heroes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            heroRichText,
            {
              name: 'formId',
              type: 'text',
              label: 'HubSpot Form ID',
              required: true,
              admin: {
                description:
                  'Enter the HubSpot form ID (e.g., "12345678-1234-1234-1234-123456789012")',
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
                description:
                  "Check this to disable HubSpot's default CSS and use only your custom styles",
              },
            },
          ],
        },
        {
          label: 'Settings',
          fields: [heroSettings],
        },
      ],
    },
  ],
}

export const heroBlocks = [
  HomeHeroBlock,
  PlatformHeroBlock,
  SolutionsHeroBlock,
  PartnerHeroBlock,
  TextHeroBlock,
  SupportHeroBlock,
  HubspotFormHeroBlock,
]
