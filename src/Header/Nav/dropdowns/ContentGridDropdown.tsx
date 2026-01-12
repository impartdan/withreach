'use client'

import type { Post, Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Link } from 'next-view-transitions'
import Image from 'next/image'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'outline'
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

interface ContentGridDropdownProps {
  items?: Array<{
    description?: string | null
    link?: CMSLinkType
  }> | null
  mode?: 'automatic' | 'manual' | null
  posts?: (string | number | Post)[] | null
  latestPosts: Post[]
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  if (!post.slug) return null

  return (
    <Link href={`/posts/${post.slug}`} className="w-[382px] block group">
      {post.heroImage && typeof post.heroImage === 'object' && 'url' in post.heroImage ? (
        <div className="aspect-[3/2] rounded-lg overflow-hidden relative">
          <Image
            src={post.heroImage.url as string}
            alt={post.heroImage.alt || post.title || ''}
            fill
            className="object-cover transition-transform group-hover:scale-105"
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

export const ContentGridDropdown: React.FC<ContentGridDropdownProps> = ({
  items,
  mode,
  posts,
  latestPosts,
}) => {
  if (!items) return null

  // Get display posts based on mode
  const displayPosts =
    mode === 'manual' && posts
      ? posts.filter((p): p is Post => typeof p === 'object' && p !== null)
      : latestPosts

  return (
    <div className="flex gap-16 p-10 min-w-[1207px]">
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
      <div className="flex gap-10">
        {displayPosts.length > 0 &&
          displayPosts.slice(0, 2).map((post, index) => (
            <div key={index} className="w-[382px]">
              <PostCard post={post} />
            </div>
          ))}

        {displayPosts.length === 0 && (
          <div className="w-[382px] flex items-center justify-center">
            <div className="text-sm text-gray-500 italic">No posts available</div>
          </div>
        )}

        {/* Show placeholder for second post if only one exists */}
        {displayPosts.length === 1 && (
          <div className="w-[382px] flex items-center justify-center">
            <div className="text-sm text-gray-500 italic">No second post available</div>
          </div>
        )}
      </div>
    </div>
  )
}
