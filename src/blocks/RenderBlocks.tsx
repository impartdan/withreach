import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { IntegrationsBlock } from '@/blocks/Integrations/Component'
import { LogoListBlock } from '@/blocks/LogoList/Component'
import { HubspotFormBlock } from '@/blocks/HubspotForm/Component'
import { StatsBlock } from '@/blocks/StatsBlock/Component'
import { BlockWrapper } from '@/blocks/BlockWrapper'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  integrations: IntegrationsBlock,
  logoList: LogoListBlock,
  hubspotForm: HubspotFormBlock,
  statsBlock: StatsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
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
                <BlockWrapper key={index} blockSettings={blockSettings}>
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
