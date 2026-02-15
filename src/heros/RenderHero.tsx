import React from 'react'

import type { Page } from '@/payload-types'

import { HomeHero } from '@/heros/HomeHero'
import { PartnerHero } from '@/heros/PartnerHero'
import { SolutionsHero } from '@/heros/SolutionsHero'
import { SupportHero } from '@/heros/SupportHero'
import { TextHero } from '@/heros/TextHero'

const heroes = {
  homeHero: HomeHero,
  solutionsHero: SolutionsHero,
  partnerHero: PartnerHero,
  textHero: TextHero,
  supportHero: SupportHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return <div className="header-offset" />

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
