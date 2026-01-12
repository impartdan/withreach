import type { Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'

interface ContentGridDropdownProps {
  items?: Array<{
    title?: string
    description?: string
    link?: any
  }> | null
  contentCards?: Array<{
    image?: string | Media | null
    tags?: Array<{ tag?: string }> | null
    heading?: string
    link?: any
  }> | null
}

export const ContentGridDropdown: React.FC<ContentGridDropdownProps> = ({
  items,
  contentCards,
}) => {
  if (!items && !contentCards) return null

  return (
    <div className="flex gap-16 p-10 min-w-[1207px]">
      {/* Left side - List Items */}
      <div className="flex-1 flex flex-col gap-8">
        {items?.map((item, index) => (
          <div key={index} className="group">
            <CMSLink {...item.link} className="block">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-[22px] font-normal text-[#04212F] group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <svg width="4" height="7" viewBox="0 0 4 7" className="mt-3" fill="none">
                  <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
                </svg>
              </div>
              {item.description && (
                <p className="text-base font-medium text-[#04212F]">{item.description}</p>
              )}
            </CMSLink>
          </div>
        ))}
      </div>

      {/* Right side - Content Cards Grid */}
      <div className="flex gap-10">
        {contentCards?.map((card, index) => (
          <div key={index} className="w-[317px] space-y-8 group">
            {card.image && (
              <div className="w-full h-[247px] rounded-lg overflow-hidden">
                <MediaComponent resource={card.image} className="w-full h-full object-cover" />
              </div>
            )}
            {card.tags && card.tags.length > 0 && (
              <div className="flex gap-6">
                {card.tags.map((tagItem, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-2 bg-[#EEECE6] rounded-full text-sm text-[#1E1A15]"
                  >
                    {tagItem.tag}
                  </span>
                ))}
              </div>
            )}
            {card.heading && card.link && (
              <CMSLink {...card.link}>
                <h3 className="text-5xl font-normal text-[#181D27] leading-tight group-hover:text-gray-600 transition-colors">
                  {card.heading}
                </h3>
              </CMSLink>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
