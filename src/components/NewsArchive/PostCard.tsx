import React from 'react'
import { Link } from 'next-view-transitions'

import type { Post, Category } from '@/payload-types'
import { Media } from '@/components/Media'
import { Tag } from '@/components/Tag'

export type PostCardData = Pick<Post, 'slug' | 'title' | 'categories' | 'heroImage' | 'meta'>

export const PostCard: React.FC<{ post: PostCardData }> = ({ post }) => {
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
    <article className="group">
      <Link href={href} className="block">
        <div className="relative rounded-lg overflow-hidden aspect-[3/2] bg-brand-linen mb-8">
          {image ? (
            <Media
              resource={image}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              htmlElement={null}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-brand-gray-light type-micro">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-4">
        {resolvedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resolvedCategories.map((cat) => (
              <Tag key={cat.id} label={cat.title} variant="secondary" />
            ))}
          </div>
        )}

        <Link href={href}>
          <h3 className="type-display-sm max-w-[414px]">{title}</h3>
        </Link>
      </div>
    </article>
  )
}
