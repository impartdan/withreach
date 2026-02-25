'use client'

import type { Media, Page, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import { motion } from 'framer-motion'

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

interface FeaturedWithListDropdownProps {
  items?: Array<{
    description?: string | null
    link?: CMSLinkType
  }> | null
  featuredCard?: {
    backgroundImage?: string | number | Media | null
    link?: CMSLinkType
  } | null
}

export const FeaturedWithListDropdown: React.FC<FeaturedWithListDropdownProps> = ({
  items,
  featuredCard,
}) => {
  if (!items && !featuredCard) return null

  return (
    <div className="flex gap-16 p-10 min-w-[884px]">
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
              <div className="flex items-center gap-2 mb-1">
                <h3 className="type-intro text-brand-black/70 group-hover/link:text-brand-black transition-colors">
                  {item.link?.label}
                </h3>
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
              {item.description && <p className="">{item.description}</p>}
            </CMSLink>
          </motion.div>
        ))}
      </div>

      {/* Right side - Featured Card */}
      {featuredCard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          className="w-[382px] h-[340px] rounded-lg overflow-hidden relative group"
        >
          {featuredCard.backgroundImage && (
            <div className="absolute inset-0">
              <MediaComponent
                resource={featuredCard.backgroundImage}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {featuredCard.link && (
            <CMSLink {...featuredCard.link} label={null} className="absolute inset-0" />
          )}
        </motion.div>
      )}
    </div>
  )
}
