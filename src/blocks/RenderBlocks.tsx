import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { ImageBlockComponent } from '@/blocks/ImageBlock/Component'
import { VideoBlockComponent } from '@/blocks/VideoBlock/Component'
import { IntegrationsBlock } from '@/blocks/Integrations/Component'
import { LogoListBlock } from '@/blocks/LogoList/Component'
import { HubspotFormBlock } from '@/blocks/HubspotForm/Component'
import { StatsBlock } from '@/blocks/StatsBlock/Component'
import { TextImageFeatureBlock } from '@/blocks/TextImageFeature/Component'
import { InsetDualImageBlock } from '@/blocks/InsetDualImage/Component'
import { InsetCopyImageBlock } from '@/blocks/InsetCopyImage/Component'
import { StatsTextBlock } from '@/blocks/StatsText/Component'
import { PageTeaserBlock } from '@/blocks/PageTeaser/Component'
import { DiagramBlock } from '@/blocks/Diagram/Component'
import { TrioTallImageCardsBlock } from '@/blocks/TrioTallImageCards/Component'
import { TrioShortImageCardsBlock } from '@/blocks/TrioShortImageCards/Component'
import { TrioTextOnlyCardsBlock } from '@/blocks/TrioTextOnlyCards/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'
import { ItemHighlightsBlock } from '@/blocks/ItemHighlights/Component'
import { FaqCenterBlock } from '@/blocks/FaqCenter/Component'
import { FaqToCallBlock } from '@/blocks/FaqToCall/Component'
import { ChecklistBlock } from '@/blocks/Checklist/Component'
import { ImageLeftTextRightBlock } from '@/blocks/ImageLeftTextRight/Component'
import { SimpleContentBlock } from '@/blocks/SimpleContent/Component'
import { IndentedContentBlock } from '@/blocks/IndentedContent/Component'
import { ConsListBlock } from '@/blocks/ConsList/Component'
import { CtaLargeBlock } from '@/blocks/CtaLarge/Component'
import { CtaSmallBlock } from '@/blocks/CtaSmall/Component'
import { DisclaimerBlock } from '@/blocks/Disclaimer/Component'
import { FiftyFiftyBlock } from '@/blocks/FiftyFifty/Component'
import { ItemHighlightsWithIntroBlock } from '@/blocks/ItemHighlightsWithIntro/Component'
import { PeopleIndexBlock } from '@/blocks/PeopleIndex/Component'
import { SupportIndexBlock } from '@/blocks/SupportIndex/Component'
import { FormBlock2Component } from '@/blocks/FormBlock2/Component'
import { BlockWrapper } from '@/blocks/BlockWrapper'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  formBlock: FormBlock,
  imageBlock: ImageBlockComponent,
  videoBlock: VideoBlockComponent,
  integrations: IntegrationsBlock,
  logoList: LogoListBlock,
  hubspotForm: HubspotFormBlock,
  statsBlock: StatsBlock,
  textImageFeature: TextImageFeatureBlock,
  insetDualImage: InsetDualImageBlock,
  insetCopyImage: InsetCopyImageBlock,
  statsText: StatsTextBlock,
  pageTeaser: PageTeaserBlock,
  diagram: DiagramBlock,
  trioTallImageCards: TrioTallImageCardsBlock,
  trioShortImageCards: TrioShortImageCardsBlock,
  trioTextOnlyCards: TrioTextOnlyCardsBlock,
  testimonial: TestimonialBlock,
  itemHighlights: ItemHighlightsBlock,
  faqCenter: FaqCenterBlock,
  faqToCall: FaqToCallBlock,
  checklist: ChecklistBlock,
  imageLeftTextRight: ImageLeftTextRightBlock,
  simpleContent: SimpleContentBlock,
  indentedContent: IndentedContentBlock,
  consList: ConsListBlock,
  ctaLarge: CtaLargeBlock,
  ctaSmall: CtaSmallBlock,
  disclaimer: DisclaimerBlock,
  fiftyFifty: FiftyFiftyBlock,
  itemHighlightsWithIntro: ItemHighlightsWithIntroBlock,
  peopleIndex: PeopleIndexBlock,
  supportIndex: SupportIndexBlock,
  formBlock2: FormBlock2Component,
}

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Not all blocks have blockSettings, so we safely access it
              const blockSettings = 'blockSettings' in block ? block.blockSettings : undefined

              return (
                <BlockWrapper key={index} blockType={blockType} blockSettings={blockSettings}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </BlockWrapper>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
