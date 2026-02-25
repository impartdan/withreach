import React from 'react'
import { Link } from 'next-view-transitions'

import type { Category, Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { Tag } from '@/components/Tag'

interface RelatedPostsSidebarProps {
  posts: Post[]
}

export const RelatedPostsSidebar: React.FC<RelatedPostsSidebarProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <div className="flex flex-col gap-[34px]">
      <p className="type-display-xs text-brand-black">Related articles</p>

      <div className="flex flex-col gap-8">
        {posts.map((post) => {
          const { slug, title, categories, heroImage, meta } = post

          const image =
            heroImage && typeof heroImage === 'object'
              ? heroImage
              : meta?.image && typeof meta.image === 'object'
                ? meta.image
                : null

          const resolvedCategories =
            categories?.filter(
              (c): c is Category => typeof c === 'object' && c !== null,
            ) ?? []

          const href = `/resources/news/${slug}`

          return (
            <Link
              key={post.id}
              href={href}
              className="flex gap-8 items-start group rounded-lg"
            >
              <div className="w-[200px] h-[135px] shrink-0 rounded-lg overflow-hidden bg-brand-linen relative">
                {image ? (
                  <Media
                    fill
                    imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
                    resource={image}
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-black/10 rounded-lg" />
                )}
              </div>

              <div className="flex flex-col gap-4 flex-1 min-w-0">
                {resolvedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <Tag label={resolvedCategories[0].title} variant="secondary" />
                  </div>
                )}

                {title && (
                  <p className="text-[22px] font-sans text-brand-black leading-snug group-hover:underline">
                    {title}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
