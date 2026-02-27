import React from 'react'

import type { Page } from '@/payload-types'

import { HeroBlockWrapper } from '@/blocks/HeroBlockWrapper'
import { HomeHero } from '@/heros/HomeHero'
import { HubspotFormHero } from '@/heros/HubspotFormHero'
import { PartnerHero } from '@/heros/PartnerHero'
import { PlatformHero } from '@/heros/PlatformHero'
import { SolutionsHero } from '@/heros/SolutionsHero'
import { SupportHero } from '@/heros/SupportHero'
import { TextHero } from '@/heros/TextHero'

const heroes = {
  homeHero: HomeHero,
  hubspotFormHero: HubspotFormHero,
  platformHero: PlatformHero,
  solutionsHero: SolutionsHero,
  partnerHero: PartnerHero,
  textHero: TextHero,
  supportHero: SupportHero,
}

const heroMeta: Partial<Record<keyof typeof heroes, { fallbackBgClass?: string }>> = {
  textHero: { fallbackBgClass: 'bg-brand-off-white' },
  supportHero: { fallbackBgClass: 'bg-brand-linen' },
  platformHero: { fallbackBgClass: 'bg-brand-off-white' },
}

export const RenderHero: React.FC<{ hero: Page['hero'] }> = ({ hero }) => {
  const block = hero?.[0]

  if (!block) return <div className="header-offset" />

  const HeroToRender = heroes[block.blockType]

  if (!HeroToRender) return null

  const settings = 'blockSettings' in block ? block.blockSettings : undefined
  const meta = heroMeta[block.blockType]

  // For solutionsHero, the background image is rendered inside the component itself
  // so the wrapper should not also render it
  const wrapperSettings =
    block.blockType === 'solutionsHero' && settings
      ? { ...settings, backgroundImage: null }
      : settings

  return (
    <HeroBlockWrapper
      blockType={block.blockType}
      blockSettings={wrapperSettings}
      fallbackBgClass={meta?.fallbackBgClass}
    >
      {React.createElement(
        HeroToRender as unknown as React.ComponentType<Record<string, unknown>>,
        block as unknown as Record<string, unknown>,
      )}
    </HeroBlockWrapper>
  )
}
