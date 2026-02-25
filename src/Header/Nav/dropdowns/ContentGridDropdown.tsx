'use client'

import type { Post, Page, CaseStudy } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { motion } from 'framer-motion'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'outline'
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'case-studies'
    value: Page | Post | CaseStudy | string | number
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
    <Link href={`/resources/news/${post.slug}`} className="w-[382px] block group">
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
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05, ease: 'easeOut' }}
            className="group"
          >
            <CMSLink {...item.link} label={null} className="block group/link">
              <div className="flex items-center gap-2">
                {item.link?.label && (
                  <span className="type-intro text-brand-black/70 group-hover/link:text-brand-black transition-colors">
                    {item.link.label}
                  </span>
                )}
                <svg
                  width="6"
                  height="9"
                  viewBox="0 0 6 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="self-center"
                >
                  <path
                    d="M0.75 8L4.375 4.375L0.75 0.75"
                    stroke="#284854"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {item.description && <p className=" mt-1">{item.description}</p>}
            </CMSLink>
          </motion.div>
        ))}
      </div>

      {/* Right side - Post Content */}
      <div className="flex gap-10">
        {displayPosts.length > 0 &&
          displayPosts.slice(0, 2).map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
              className="w-[382px]"
            >
              <PostCard post={post} />
            </motion.div>
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
