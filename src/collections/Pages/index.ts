import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { Integrations } from '../../blocks/Integrations/config'
import { LogoList } from '../../blocks/LogoList/config'
import { HubspotFormBlock } from '../../blocks/HubspotForm/config'
import { StatsBlock } from '../../blocks/StatsBlock/config'
import { TextImageFeature } from '../../blocks/TextImageFeature/config'
import { InsetDualImage } from '../../blocks/InsetDualImage/config'
import { InsetCopyImage } from '../../blocks/InsetCopyImage/config'
import { StatsText } from '../../blocks/StatsText/config'
import { PageTeaser } from '../../blocks/PageTeaser/config'
import { Diagram } from '../../blocks/Diagram/config'
import { TrioTallImageCards } from '../../blocks/TrioTallImageCards/config'
import { TrioShortImageCards } from '../../blocks/TrioShortImageCards/config'
import { TrioTextOnlyCards } from '../../blocks/TrioTextOnlyCards/config'
import { Testimonial } from '../../blocks/Testimonial/config'
import { ItemHighlights } from '../../blocks/ItemHighlights/config'
import { FaqCenter } from '../../blocks/FaqCenter/config'
import { FaqToCall } from '../../blocks/FaqToCall/config'
import { Checklist } from '../../blocks/Checklist/config'
import { ImageLeftTextRight } from '../../blocks/ImageLeftTextRight/config'
import { SimpleContent } from '../../blocks/SimpleContent/config'
import { IndentedContent } from '../../blocks/IndentedContent/config'
import { ConsList } from '../../blocks/ConsList/config'
import { CtaLarge } from '../../blocks/CtaLarge/config'
import { CtaSmall } from '../../blocks/CtaSmall/config'
import { Disclaimer } from '../../blocks/Disclaimer/config'
import { CenterText } from '../../blocks/CenterText/config'
import { RichTextBlock } from '../../blocks/RichTextBlock/config'
import { FiftyFifty } from '../../blocks/FiftyFifty/config'
import { ItemHighlightsWithIntro } from '../../blocks/ItemHighlightsWithIntro/config'
import { PeopleIndex } from '../../blocks/PeopleIndex/config'
import { SupportIndex } from '../../blocks/SupportIndex/config'
import { FormBlock2 } from '../../blocks/FormBlock2/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
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
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                Integrations,
                LogoList,
                HubspotFormBlock,
                StatsBlock,
                TextImageFeature,
                InsetDualImage,
                InsetCopyImage,
                StatsText,
                PageTeaser,
                Diagram,
                TrioTallImageCards,
                TrioShortImageCards,
                TrioTextOnlyCards,
                Testimonial,
                ItemHighlights,
                FaqCenter,
                FaqToCall,
                Checklist,
                ImageLeftTextRight,
                SimpleContent,
                IndentedContent,
                ConsList,
                CtaLarge,
                CtaSmall,
                Disclaimer,
                CenterText,
                RichTextBlock,
                FiftyFifty,
                ItemHighlightsWithIntro,
                PeopleIndex,
                SupportIndex,
                FormBlock2,
              ],
              required: false,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
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
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
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
                  'When enabled, this page will not appear in search engine results (adds noindex, nofollow meta tag).',
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
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
