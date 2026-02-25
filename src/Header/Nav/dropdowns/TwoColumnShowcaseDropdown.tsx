'use client'

import type { CaseStudy, CaseStudyCategory, Category, Page, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Link } from 'next-view-transitions'
import { Media } from '@/components/Media'
import { Tag } from '@/components/Tag'
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

interface TwoColumnShowcaseDropdownProps {
  items?: Array<{
    description?: string | null
    link?: CMSLinkType
  }> | null
  mode?: 'automatic' | 'manual' | null
  contentType?: 'posts' | 'case-studies' | null
  post?: string | number | Post | null
  caseStudy?: string | number | CaseStudy | null
  latestPosts: Post[]
  latestCaseStudies: CaseStudy[]
}

const CaseStudyShowcaseCard: React.FC<{ caseStudy: CaseStudy }> = ({ caseStudy }) => {
  if (!caseStudy.slug) return null

  const image =
    caseStudy.heroImage && typeof caseStudy.heroImage === 'object' ? caseStudy.heroImage : null
  const logo =
    caseStudy.companyLogo && typeof caseStudy.companyLogo === 'object'
      ? caseStudy.companyLogo
      : null
  const primaryCategory =
    caseStudy.caseStudyCategories?.[0] && typeof caseStudy.caseStudyCategories[0] === 'object'
      ? (caseStudy.caseStudyCategories[0] as CaseStudyCategory)
      : null

  return (
    <Link href={`/resources/case-studies/${caseStudy.slug}`} className="w-[359px] block group">
      <div className="aspect-[3/2] rounded-lg overflow-hidden relative mb-6">
        {image ? (
          <>
            <Media
              resource={image}
              pictureClassName="absolute inset-0 w-full h-full bg-brand-linen"
              imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              htmlElement={null}
            />
            <div className="absolute inset-0 bg-black/30 rounded-lg" />
          </>
        ) : (
          <div className="absolute inset-0 bg-brand-black/80 rounded-lg" />
        )}
        {logo && (
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <Media
              resource={logo}
              pictureClassName="max-w-[60%] max-h-[40%] relative z-10"
              imgClassName="object-contain"
              htmlElement={null}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-3 flex-wrap">
          <Tag label="Case Studies" variant="primary" />
          {primaryCategory && <Tag label={primaryCategory.title} variant="secondary" />}
        </div>

        {caseStudy.companyName && (
          <div className="flex items-center gap-2 type-eyebrow text-brand-black">
            <span>{caseStudy.companyName}</span>
            <span className="text-brand-gray-med">&times;</span>
            <span>Reach</span>
          </div>
        )}

        <h4 className="type-display-sm">{caseStudy.title}</h4>
      </div>
    </Link>
  )
}

const PostShowcaseCard: React.FC<{ post: Post }> = ({ post }) => {
  if (!post.slug) return null

  const image = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
  const primaryCategory =
    post.categories?.[0] && typeof post.categories[0] === 'object'
      ? (post.categories[0] as Category)
      : null

  return (
    <Link href={`/resources/news/${post.slug}`} className="w-[359px] block group">
      <div className="aspect-[3/2] rounded-lg overflow-hidden relative mb-6">
        {image ? (
          <Media
            resource={image}
            pictureClassName="absolute inset-0 w-full h-full bg-brand-linen"
            imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            htmlElement={null}
          />
        ) : (
          <div className="absolute inset-0 bg-brand-black/80 rounded-lg" />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-3 flex-wrap">
          <Tag label="News" variant="primary" />
          {primaryCategory && <Tag label={primaryCategory.title} variant="secondary" />}
        </div>

        <h4 className="type-display-sm">{post.title}</h4>
      </div>
    </Link>
  )
}

export const TwoColumnShowcaseDropdown: React.FC<TwoColumnShowcaseDropdownProps> = ({
  items,
  mode,
  contentType,
  post,
  caseStudy,
  latestPosts,
  latestCaseStudies,
}) => {
  if (!items) return null

  const isCaseStudies = contentType === 'case-studies'

  const displayCaseStudy = isCaseStudies
    ? mode === 'manual'
      ? typeof caseStudy === 'object' && caseStudy !== null
        ? caseStudy
        : null
      : latestCaseStudies[0] || null
    : null

  const displayPost = !isCaseStudies
    ? mode === 'manual'
      ? typeof post === 'object' && post !== null
        ? post
        : null
      : latestPosts[0] || null
    : null

  return (
    <div className="flex gap-16 p-10">
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
                <svg width="4" height="7" viewBox="0 0 4 7" fill="none">
                  <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
                </svg>
              </div>
              {item.description && <p className="mt-1">{item.description}</p>}
            </CMSLink>
          </motion.div>
        ))}
      </div>

      {/* Right side - Showcase Card */}
      {(displayPost || displayCaseStudy) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
        >
          {displayCaseStudy ? (
            <CaseStudyShowcaseCard caseStudy={displayCaseStudy} />
          ) : displayPost ? (
            <PostShowcaseCard post={displayPost} />
          ) : null}
        </motion.div>
      )}

      {!displayPost && !displayCaseStudy && (mode === 'automatic' || mode === 'manual') && (
        <div className="w-[359px] flex items-center justify-center">
          <div className="text-sm text-gray-500 italic">No content available</div>
        </div>
      )}
    </div>
  )
}
