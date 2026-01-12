import type { Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'

interface FeaturedWithListDropdownProps {
  items?: Array<{
    description?: string
    link?: any
  }> | null
  featuredCard?: {
    backgroundImage?: string | Media | null
    link?: any
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
          <div key={index} className="group">
            <CMSLink {...item.link} label={null} className="block">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-[22px] font-normal text-[#04212F] group-hover:text-gray-600 transition-colors">
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              {item.description && (
                <p className="text-base font-medium text-[#04212F]">{item.description}</p>
              )}
            </CMSLink>
          </div>
        ))}
      </div>

      {/* Right side - Featured Card */}
      {featuredCard && (
        <div className="w-[382px] h-[340px] rounded-lg overflow-hidden relative group">
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
        </div>
      )}
    </div>
  )
}
