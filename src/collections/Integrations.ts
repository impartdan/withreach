import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { linkGroup } from '../fields/linkGroup'
import { Content } from '../blocks/Content/config'
import { ImageBlock } from '../blocks/ImageBlock/config'
import { VideoBlock } from '../blocks/VideoBlock/config'
import { LogoList } from '../blocks/LogoList/config'
import { HubspotFormBlock } from '../blocks/HubspotForm/config'
import { StatsBlock } from '../blocks/StatsBlock/config'
import { TextImageFeature } from '../blocks/TextImageFeature/config'
import { InsetDualImage } from '../blocks/InsetDualImage/config'
import { InsetCopyImage } from '../blocks/InsetCopyImage/config'
import { StatsText } from '../blocks/StatsText/config'
import { PageTeaser } from '../blocks/PageTeaser/config'
import { Diagram } from '../blocks/Diagram/config'
import { TrioTallImageCards } from '../blocks/TrioTallImageCards/config'
import { TrioShortImageCards } from '../blocks/TrioShortImageCards/config'
import { TrioTextOnlyCards } from '../blocks/TrioTextOnlyCards/config'
import { Testimonial } from '../blocks/Testimonial/config'
import { ItemHighlights } from '../blocks/ItemHighlights/config'
import { FaqCenter } from '../blocks/FaqCenter/config'
import { FaqToCall } from '../blocks/FaqToCall/config'
import { Checklist } from '../blocks/Checklist/config'
import { ImageLeftTextRight } from '../blocks/ImageLeftTextRight/config'
import { SimpleContent } from '../blocks/SimpleContent/config'
import { IndentedContent } from '../blocks/IndentedContent/config'
import { ConsList } from '../blocks/ConsList/config'
import { ProsList } from '../blocks/ProsList/config'
import { CtaLarge } from '../blocks/CtaLarge/config'
import { CtaSmall } from '../blocks/CtaSmall/config'
import { Disclaimer } from '../blocks/Disclaimer/config'
import { FiftyFifty } from '../blocks/FiftyFifty/config'
import { ItemHighlightsWithIntro } from '../blocks/ItemHighlightsWithIntro/config'
import { PeopleIndex } from '../blocks/PeopleIndex/config'
import { CardGrid } from '../blocks/CardGrid/config'
import { FormBlock2 } from '../blocks/FormBlock2/config'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Collections',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'layoutType', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layoutType',
      type: 'select',
      label: 'Layout',
      defaultValue: 'simple',
      options: [
        {
          label: 'Simple',
          value: 'simple',
        },
        {
          label: 'Detailed',
          value: 'detailed',
        },
      ],
      admin: {
        description: 'Choose how this integration page is displayed.',
      },
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
      name: 'introText',
      type: 'textarea',
      label: 'Intro Text',
      admin: {
        description: 'Introductory text displayed below the title in the header.',
        condition: (data) => data?.layoutType === 'detailed',
      },
    },
    linkGroup({
      overrides: {
        name: 'headerLinks',
        label: 'Header Links',
        maxRows: 4,
        admin: {
          description: 'Links displayed in the header section.',
          condition: (data) => data?.layoutType === 'detailed',
        },
      },
    }),
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Blocks',
      blocks: [
        Content,
        ImageBlock,
        VideoBlock,
        LogoList,
        HubspotFormBlock,
        StatsBlock,
        // dbName override avoids exceeding PostgreSQL's 63-char identifier limit
        // (integrations_blocks_ prefix is 7 chars longer than pages_blocks_)
        { ...TextImageFeature, dbName: 'text_img_feat' },
        // blockSettings backgroundImage + backgroundVideo FKs both truncate to the same
        // 63-char constraint name when the table name is ≥ 36 chars — short dbNames prevent collision
        { ...InsetDualImage, dbName: 'idi' },
        { ...InsetCopyImage, dbName: 'ici' },
        StatsText,
        PageTeaser,
        Diagram,
        // Cards contain nested linkGroups — dbName overrides keep enum names under 63 chars
        { ...TrioTallImageCards, dbName: 'ttac' },
        { ...TrioShortImageCards, dbName: 'tsac' },
        TrioTextOnlyCards,
        Testimonial,
        ItemHighlights,
        FaqCenter,
        FaqToCall,
        Checklist,
        ImageLeftTextRight,
        SimpleContent,
        // indented_content = 16 chars → same FK collision risk as InsetDualImage/InsetCopyImage
        { ...IndentedContent, dbName: 'ic' },
        ConsList,
        ProsList,
        CtaLarge,
        // cards contain inline backgroundImagePosition select without dbName — override keeps enum under 63 chars
        { ...CtaSmall, dbName: 'csm' },
        Disclaimer,
        FiftyFifty,
        ItemHighlightsWithIntro,
        PeopleIndex,
        CardGrid,
        FormBlock2,
      ],
      admin: {
        initCollapsed: true,
        description: 'Stack blocks to build out the page content.',
        condition: (data) => data?.layoutType === 'detailed',
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
