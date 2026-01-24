import React from 'react'

import type { Page } from '@/payload-types'

import { BackgroundImageHero } from '@/heros/BackgroundImage'
import { FullscreenHero } from '@/heros/Fullscreen'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { TextAndImageHero } from '@/heros/TextAndImage'

const heroes = {
  backgroundImage: BackgroundImageHero,
  fullscreen: FullscreenHero,
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  textAndImage: TextAndImageHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return <div className="header-offset" />

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
