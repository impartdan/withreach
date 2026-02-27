import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { ImageBlock } from '../../blocks/ImageBlock/config'
import { VideoEmbed } from '../../blocks/VideoEmbed/config'
import { StatsBlock } from '../../blocks/StatsBlock/config'
import { BlockquoteBlock } from '../../blocks/Blockquote/config'
import { ConclusionBlock } from '../../blocks/Conclusion/config'
import { ChecklistList } from '../../blocks/ChecklistList/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateCaseStudy, revalidateCaseStudyDelete } from './hooks/revalidateCaseStudy'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const CaseStudies: CollectionConfig<'case-studies'> = {
  slug: 'case-studies',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    companyName: true,
    heroImage: true,
    companyLogo: true,
    categories: true,
    caseStudyCategories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: 'Case Studies',
    defaultColumns: ['title', 'companyName', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'case-studies',
        }),
    },
    preview: (data) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'case-studies',
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
      label: 'Company Name',
      admin: {
        description: 'The name of the company featured in this case study (e.g., "Club L", "Revolve").',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      admin: {
        description: 'A short summary of the case study used in listings and previews.',
        rows: 3,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
            },
            {
              name: 'companyLogo',
              type: 'upload',
              relationTo: 'media',
              label: 'Company Logo',
              admin: {
                description: 'Logo displayed over the card image. Use a white/transparent version for best results.',
              },
            },
            {
              name: 'pdf',
              type: 'upload',
              relationTo: 'media',
              label: 'PDF Version',
              filterOptions: {
                mimeType: { in: ['application/pdf'] },
              },
              admin: {
                description: 'Upload a PDF version of this case study. A download link will appear in the sidebar CTA.',
              },
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Overview Highlights',
              admin: {
                description: 'Key facts displayed at the top of the case study (e.g. Industry: Retail Fashion, Founded: 2003, Tech Stack: Checkout API).',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures.filter((f) => f.key !== 'blockquote'),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [ImageBlock, VideoEmbed, StatsBlock, BlockquoteBlock, ConclusionBlock, ChecklistList] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedCaseStudies',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'case-studies',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'caseStudyCategories',
              type: 'relationship',
              label: 'Case Study Types',
              admin: {
                position: 'sidebar',
                description: 'Categorize this case study by type (e.g., Retail, SaaS, Enterprise).',
              },
              hasMany: true,
              relationTo: 'case-study-categories',
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            {
              name: 'noindex',
              type: 'checkbox',
              defaultValue: false,
              label: 'Block search engine indexing',
              admin: {
                description:
                  'When enabled, this case study will not appear in search engine results (adds noindex, nofollow meta tag).',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateCaseStudy],
    afterDelete: [revalidateCaseStudyDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
