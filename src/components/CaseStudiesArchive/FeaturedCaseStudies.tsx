'use client'
import React, { useState, useCallback } from 'react'
import { Link } from 'next-view-transitions'

import type { CaseStudy, Category } from '@/payload-types'
import { Media } from '@/components/Media'
import { Tag } from '@/components/Tag'
import { cn } from '@/utilities/ui'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

type FeaturedCaseStudiesProps = {
  caseStudies: (number | CaseStudy)[]
}

export const FeaturedCaseStudies: React.FC<FeaturedCaseStudiesProps> = ({ caseStudies }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const resolved = caseStudies.filter(
    (cs): cs is CaseStudy => typeof cs === 'object' && cs !== null,
  )

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, resolved.length - 1)))
    },
    [resolved.length],
  )

  if (resolved.length === 0) return null

  const cs = resolved[currentIndex]
  const heroImage = typeof cs.heroImage === 'object' ? cs.heroImage : null
  const metaImage =
    cs.meta && typeof cs.meta.image === 'object' ? cs.meta.image : null
  const image = heroImage || metaImage

  const categories =
    cs.categories?.filter(
      (c): c is Category => typeof c === 'object' && c !== null,
    ) ?? []

  return (
    <section className="bg-white py-xl">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {image && (
            <RevealOnScroll variant="slideUp" className="w-full lg:w-[55%] shrink-0">
              <Link href={`/resources/case-studies/${cs.slug}`} className="block">
                <div className="relative rounded-lg overflow-hidden aspect-[3/2]">
                  <Media
                    resource={image}
                    pictureClassName="absolute inset-0 w-full h-full"
                    imgClassName="w-full h-full object-cover"
                    htmlElement={null}
                  />
                </div>
              </Link>
            </RevealOnScroll>
          )}

          <RevealOnScroll variant="fadeIn" delay={0.15} className="flex flex-col justify-between min-h-[280px] lg:min-h-[400px] w-full">
            <Link href={`/resources/case-studies/${cs.slug}`} className="block">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Tag key={cat.id} label={cat.title} variant="secondary" />
                      ))}
                    </div>
                  )}

                  {cs.companyName && (
                    <div className="flex items-center gap-2 type-eyebrow text-brand-black">
                      <span>{cs.companyName}</span>
                      <span className="text-brand-gray-med">&times;</span>
                      <span>Reach</span>
                    </div>
                  )}

                  <h3 className="type-display-sm">{cs.title}</h3>
                </div>

                <span className="inline-flex items-center gap-3 type-button text-brand-black border border-brand-black rounded-[6px] px-6 py-2 self-start hover:bg-brand-black hover:text-white transition-colors">
                  Read article
                </span>
              </div>
            </Link>

            {resolved.length > 1 && (
              <div className="flex items-center justify-between mt-8">
                <div className="flex gap-2">
                  {resolved.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to featured case study ${i + 1}`}
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        i === currentIndex
                          ? 'w-6 bg-brand-black'
                          : 'w-1.5 bg-brand-gray-light',
                      )}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => goTo(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    aria-label="Previous featured case study"
                    className="w-10 h-5 flex items-center justify-center rounded border border-brand-gray-light disabled:opacity-30 transition-opacity"
                  >
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 1L1 5M1 5L5 9M1 5H15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => goTo(currentIndex + 1)}
                    disabled={currentIndex === resolved.length - 1}
                    aria-label="Next featured case study"
                    className="w-10 h-5 flex items-center justify-center rounded border border-brand-gray-light disabled:opacity-30 transition-opacity"
                  >
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 1L15 5M15 5L11 9M15 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
