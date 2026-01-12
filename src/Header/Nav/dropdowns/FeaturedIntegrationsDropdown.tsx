'use client'

import type { Integration, Page, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import { Link } from 'next-view-transitions'
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

interface FeaturedIntegrationsDropdownProps {
  items?: Array<{
    description?: string | null
    link?: CMSLinkType
  }> | null
  integrations?: Array<string | number | Integration> | null
}

export const FeaturedIntegrationsDropdown: React.FC<FeaturedIntegrationsDropdownProps> = ({
  items,
  integrations,
}) => {
  if (!items && !integrations) return null

  return (
    <div className="flex gap-10 p-10">
      {/* Left side - List Items */}
      <div className="flex-1 flex flex-col gap-10">
        {items?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05, ease: 'easeOut' }}
            className="group"
          >
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
          </motion.div>
        ))}
      </div>

      {/* Right side - Integrations */}
      <div className="w-[409px] space-y-4">
        {integrations?.map((integration, index) => {
          if (typeof integration !== 'object') return null

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
            >
              <Link
                href={`/integrations/${integration.slug}`}
                className="flex items-center justify-between p-4 bg-[#EEECE6] rounded-[10px] group hover:bg-[#E5E3DD] transition-colors"
              >
                <div className="flex items-center gap-4">
                  {integration.icon && (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <MediaComponent
                        resource={integration.icon}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  )}
                  <span className="text-[40px] font-normal text-[#1E1A15] leading-[44px]">
                    {integration.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-base font-semibold text-[#1E1A15]">
                  <svg width="4" height="8" viewBox="0 0 4 8" fill="none">
                    <path d="M0.5 0.5L3.5 4L0.5 7.5" stroke="#1E1A15" strokeWidth="1.5" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
