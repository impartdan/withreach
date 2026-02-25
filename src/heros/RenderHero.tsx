import React from 'react'

import type { Page } from '@/payload-types'

import { BlockWrapper } from '@/blocks/BlockWrapper'
import { HomeHero } from '@/heros/HomeHero'
import { PartnerHero } from '@/heros/PartnerHero'
import { PlatformHero } from '@/heros/PlatformHero'
import { SolutionsHero } from '@/heros/SolutionsHero'
import { SupportHero } from '@/heros/SupportHero'
import { TextHero } from '@/heros/TextHero'

const heroes = {
  homeHero: HomeHero,
  platformHero: PlatformHero,
  solutionsHero: SolutionsHero,
  partnerHero: PartnerHero,
  textHero: TextHero,
  supportHero: SupportHero,
}

const heroMeta: Partial<Record<keyof typeof heroes, { fallbackBgClass?: string }>> = {
  textHero: { fallbackBgClass: 'bg-brand-offwhite' },
  supportHero: { fallbackBgClass: 'bg-brand-linen' },
  platformHero: { fallbackBgClass: 'bg-brand-offwhite' },
}

export const RenderHero: React.FC<{ hero: Page['hero'] }> = ({ hero }) => {
  const block = hero?.[0]

  if (!block) return <div className="header-offset" />

  const HeroToRender = heroes[block.blockType]

  if (!HeroToRender) return null

  const settings = 'blockSettings' in block ? block.blockSettings : undefined
  const meta = heroMeta[block.blockType]

  return (
    <BlockWrapper
      blockType={block.blockType}
      blockSettings={settings}
      fallbackBgClass={meta?.fallbackBgClass}
      className="header-offset"
    >
      <HeroToRender {...(block as any)} />
    </BlockWrapper>
  )
}
