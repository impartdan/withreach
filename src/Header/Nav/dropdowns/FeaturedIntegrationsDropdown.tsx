'use client'

import type { Integration, Page, Post, CaseStudy } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import { LinkChevron } from '@/components/ui/link-chevron'
import { Link } from 'next-view-transitions'
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
            <CMSLink {...item.link} label={null} className="block group/link">
              <div className="flex items-center gap-2">
                {item.link?.label && (
                  <span className="type-intro text-brand-black/70 group-hover/link:text-brand-black transition-colors">
                    {item.link.label}
                  </span>
                )}
                <LinkChevron tone="brand" size="sm" />
              </div>
              {item.description && <p className=" mt-1">{item.description}</p>}
            </CMSLink>
          </motion.div>
        ))}
      </div>

      {/* Right side - Integrations */}

      <div className="w-[409px] space-y-4">
        {integrations ? <div className="type-micro-b">Featured integrations</div> : null}
        {integrations?.map((integration, index) => {
          if (typeof integration !== 'object') return null
          const isPubliclyViewable =
            (integration as { isPubliclyViewable?: boolean }).isPubliclyViewable !== false

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
            >
              {isPubliclyViewable ? (
                <Link
                  href={`/partners/integrations/${integration.slug}`}
                  className="flex items-center justify-between p-2 bg-brand-linen rounded-[10px] group hover:bg-white border-transparent border hover:border-black/20 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    {integration.icon && (
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <MediaComponent
                          resource={integration.icon}
                          htmlElement={null}
                          pictureClassName="relative w-6 h-6 shrink-0"
                          imgClassName="w-full h-full object-contain object-center block"
                        />
                      </div>
                    )}
                    <span className="type-display-xs">{integration.title}</span>
                  </div>
                  <div className="shrink-0 flex items-center justify-center self-stretch">
                    <LinkChevron tone="dark" size="md" />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center justify-between p-2 bg-brand-linen rounded-[10px] border border-transparent">
                  <div className="flex items-center gap-4">
                    {integration.icon && (
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <MediaComponent
                          resource={integration.icon}
                          htmlElement={null}
                          pictureClassName="relative w-6 h-6 shrink-0"
                          imgClassName="w-full h-full object-contain object-center block"
                        />
                      </div>
                    )}
                    <span className="type-display-xs">{integration.title}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
