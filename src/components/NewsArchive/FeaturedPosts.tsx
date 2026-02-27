'use client'
import React, { useState, useCallback } from 'react'
import { Link } from 'next-view-transitions'

import type { Post, Category } from '@/payload-types'
import { Media } from '@/components/Media'
import { Tag } from '@/components/Tag'
import { cn } from '@/utilities/ui'

type FeaturedPostsProps = {
  posts: (number | Post)[]
}

export const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const resolvedPosts = posts.filter(
    (p): p is Post => typeof p === 'object' && p !== null,
  )

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, resolvedPosts.length - 1)))
    },
    [resolvedPosts.length],
  )

  if (resolvedPosts.length === 0) return null

  const post = resolvedPosts[currentIndex]
  const heroImage = typeof post.heroImage === 'object' ? post.heroImage : null
  const metaImage =
    post.meta && typeof post.meta.image === 'object' ? post.meta.image : null
  const image = heroImage || metaImage

  const categories =
    post.categories?.filter(
      (c): c is Category => typeof c === 'object' && c !== null,
    ) ?? []

  return (
    <section className="bg-white py-xl">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {image && (
            <Link
              href={`/resources/news/${post.slug}`}
              className="w-full lg:w-[55%] shrink-0"
            >
              <div className="relative rounded-lg overflow-hidden aspect-[3/2]">
                <Media
                  resource={image}
                  pictureClassName="absolute inset-0 w-full h-full"
                  imgClassName="w-full h-full object-cover"
                  htmlElement={null}
                />
              </div>
            </Link>
          )}

          <div className="flex flex-col justify-between min-h-[280px] lg:min-h-[400px] w-full">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Tag key={cat.id} label={cat.title} variant="secondary" />
                    ))}
                  </div>
                )}

                <Link href={`/resources/news/${post.slug}`}>
                  <h3 className="type-display-sm">{post.title}</h3>
                </Link>
              </div>

              <Link
                href={`/resources/news/${post.slug}`}
                className="inline-flex items-center gap-3 type-button text-brand-black border border-brand-black rounded-[6px] px-6 py-2 self-start hover:bg-brand-black hover:text-white transition-colors"
              >
                Read article
              </Link>
            </div>

            {resolvedPosts.length > 1 && (
              <div className="flex items-center justify-between mt-8">
                <div className="flex gap-2">
                  {resolvedPosts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to featured post ${i + 1}`}
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
                    aria-label="Previous featured post"
                    className="w-10 h-5 flex items-center justify-center rounded border border-brand-gray-light disabled:opacity-30 transition-opacity"
                  >
                    <svg
                      width="16"
                      height="10"
                      viewBox="0 0 16 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 1L1 5M1 5L5 9M1 5H15"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => goTo(currentIndex + 1)}
                    disabled={currentIndex === resolvedPosts.length - 1}
                    aria-label="Next featured post"
                    className="w-10 h-5 flex items-center justify-center rounded border border-brand-gray-light disabled:opacity-30 transition-opacity"
                  >
                    <svg
                      width="16"
                      height="10"
                      viewBox="0 0 16 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 1L15 5M15 5L11 9M15 5H1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
