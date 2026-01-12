import type { Integration } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import Link from 'next/link'

interface FeaturedIntegrationsDropdownProps {
  items?: Array<{
    description?: string
    link?: any
  }> | null
  integrations?: Array<string | Integration> | null
}

export const FeaturedIntegrationsDropdown: React.FC<FeaturedIntegrationsDropdownProps> = ({
  items,
  integrations,
}) => {
  if (!items && !integrations) return null

  return (
    <div className="flex gap-10 p-10 min-w-[914px]">
      {/* Left side - List Items */}
      <div className="flex-1 flex flex-col gap-10">
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

      {/* Right side - Integrations */}
      <div className="w-[409px] space-y-4">
        {integrations?.map((integration, index) => {
          if (typeof integration !== 'object') return null

          return (
            <Link
              key={index}
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
          )
        })}
      </div>
    </div>
  )
}
