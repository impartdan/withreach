'use client'

import type { Media, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

interface TwoColumnShowcaseDropdownProps {
  items?: Array<{
    description?: string
    link?: any
  }> | null
  mode?: 'automatic' | 'manual'
  post?: string | Post | null
  latestPosts: Post[]
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  if (!post.slug) return null

  return (
    <Link href={`/posts/${post.slug}`} className="w-[382px] block group">
      {post.heroImage && typeof post.heroImage === 'object' && 'url' in post.heroImage ? (
        <div className="aspect-[3/2] rounded-lg overflow-hidden">
          <img
            src={post.heroImage.url as string}
            alt={post.heroImage.alt || post.title || ''}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : null}
      <div className="p-4 bg-gray-50 rounded-lg mt-4">
        <h4 className="text-lg font-medium group-hover:text-gray-600 transition-colors">
          {post.title}
        </h4>
        {post.meta?.description && (
          <p className="text-sm text-gray-600 mt-2">{post.meta.description}</p>
        )}
      </div>
    </Link>
  )
}

export const TwoColumnShowcaseDropdown: React.FC<TwoColumnShowcaseDropdownProps> = ({
  items,
  mode,
  post,
  latestPosts,
}) => {
  if (!items) return null

  const displayPost = mode === 'manual' 
    ? (typeof post === 'object' ? post : null) 
    : (latestPosts[0] || null)

  return (
    <div className="flex gap-16 p-10 min-w-[915px]">
      {/* Left side - List Items */}
      <div className="flex-1 flex flex-col gap-8">
        {items?.map((item, index) => (
          <div key={index} className="group">
            <CMSLink {...item.link} label={null} className="block">
              <div className="flex items-start gap-2">
                {item.link?.label && (
                  <span className="text-[22px] font-normal text-[#04212F] group-hover:text-gray-600 transition-colors">
                    {item.link.label}
                  </span>
                )}
                <svg width="4" height="7" viewBox="0 0 4 7" className="mt-3" fill="none">
                  <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
                </svg>
              </div>
              {item.description && (
                <p className="text-base font-medium text-[#04212F] mt-1">{item.description}</p>
              )}
            </CMSLink>
          </div>
        ))}
      </div>

      {/* Right side - Post Content */}
      {displayPost && <PostCard post={displayPost} />}

      {!displayPost && (mode === 'automatic' || mode === 'manual') && (
        <div className="w-[382px] flex items-center justify-center">
          <div className="text-sm text-gray-500 italic">No post available</div>
        </div>
      )}
    </div>
  )
}
