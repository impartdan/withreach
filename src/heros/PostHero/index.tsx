'use client'
import React from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { BackButton } from '@/components/ui/back-button'
import { Tag } from '@/components/Tag'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const PostHero: React.FC<{ post: Post }> = ({ post }) => {
  const { categories, excerpt, heroImage, publishedAt, title } = post

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <section className="bg-brand-off-white w-full">
      <div className="container header-offset pb-10 md:pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[78px] items-start justify-between max-w-6xl mx-auto md:pt-14">
          {/* Left column */}
          <RevealOnScroll variant="fadeIn" className="flex flex-col gap-10 flex-1 min-w-0 max-w-[661px]">
            <BackButton href="/resources/news">Back to News and Insights</BackButton>

            <div className="flex flex-col gap-6">
              <h1 className="type-display-lg text-brand-black">{title}</h1>

              <div className="flex flex-col gap-2">
                {formattedDate && (
                  <p className="text-lg font-sans font-medium text-brand-black">{formattedDate}</p>
                )}
                {excerpt && (
                  <p className="text-lg font-sans font-medium text-brand-black leading-relaxed">
                    {excerpt}
                  </p>
                )}
              </div>
            </div>

            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => {
                  if (typeof category !== 'object' || !category) return null
                  return (
                    <Tag key={index} label={category.title ?? 'Untitled'} variant="secondary" />
                  )
                })}
              </div>
            )}
          </RevealOnScroll>

          {/* Right column — hero image */}
          {heroImage && typeof heroImage !== 'string' && (
            <RevealOnScroll variant="slideUp" delay={0.15} className="w-full lg:w-[430px] shrink-0">
              <div className="relative w-full aspect-[430/290] rounded-lg overflow-hidden">
                <Media fill priority imgClassName="object-cover" resource={heroImage} />
              </div>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>
  )
}
