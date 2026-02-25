import React from 'react'
import Link from 'next/link'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

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
      <div className="container header-offset pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-10 flex-1 min-w-0">
            {/* Back link */}
            <Link
              href="/resources/news"
              className="inline-flex items-center gap-2 text-brand-black text-base font-sans font-semibold hover:opacity-70 transition-opacity"
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-90"
              >
                <path
                  d="M1 1L7 6L1 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to News and Insights
            </Link>

            <div className="flex flex-col gap-6">
              {/* Title */}
              <h1 className="type-display-lg text-brand-black">{title}</h1>

              {/* Date + Excerpt */}
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

            {/* Category pills */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => {
                  if (typeof category !== 'object' || !category) return null
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-brand-gray-light text-brand-black text-sm font-sans font-medium"
                    >
                      {category.title ?? 'Untitled'}
                    </span>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right column — hero image */}
          {heroImage && typeof heroImage !== 'string' && (
            <div className="w-full lg:w-[40%] lg:max-w-[420px] shrink-0">
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden">
                <Media
                  fill
                  priority
                  imgClassName="object-cover"
                  resource={heroImage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
