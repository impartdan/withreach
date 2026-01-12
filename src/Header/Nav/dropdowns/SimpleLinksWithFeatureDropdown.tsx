import type { Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'

interface SimpleLinksWithFeatureDropdownProps {
  links?: Array<{
    link?: any
  }> | null
  featuredArticle?: {
    heading?: string
    backgroundImage?: string | Media | null
    link?: any
  } | null
}

export const SimpleLinksWithFeatureDropdown: React.FC<SimpleLinksWithFeatureDropdownProps> = ({
  links,
  featuredArticle,
}) => {
  if (!links && !featuredArticle) return null

  return (
    <div className="flex gap-16 p-10 min-w-[854px]">
      {/* Left side - Simple Links */}
      <div className="flex-1 flex flex-col gap-8">
        {links?.map((item, index) => (
          <CMSLink
            key={index}
            {...item.link}
            className="flex items-center gap-2 text-[22px] font-normal text-[#04212F] hover:text-gray-600 transition-colors group"
          >
            <span>{item.link?.label}</span>
            <svg width="4" height="7" viewBox="0 0 4 7" className="mt-1" fill="none">
              <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
            </svg>
          </CMSLink>
        ))}
      </div>

      {/* Right side - Featured Article */}
      {featuredArticle && (
        <div className="w-[442px] h-[340px] rounded-lg overflow-hidden relative group">
          {featuredArticle.backgroundImage && (
            <div className="absolute inset-0">
              <MediaComponent
                resource={featuredArticle.backgroundImage}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-[#999177] flex items-center justify-center">
            <div className="text-center space-y-4 px-8">
              {featuredArticle.heading && (
                <>
                  <h3 className="text-4xl font-normal text-[#999177] bg-[#1E1A15] px-3 py-2 rounded inline-block">
                    {featuredArticle.heading.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  {featuredArticle.heading.split(' ').length > 2 && (
                    <h3 className="text-4xl font-normal text-white bg-[#1E1A15] px-3 py-2 rounded inline-block">
                      {featuredArticle.heading.split(' ').slice(2).join(' ')}
                    </h3>
                  )}
                </>
              )}
            </div>
          </div>
          {featuredArticle.link && (
            <CMSLink {...featuredArticle.link} className="absolute inset-0" />
          )}
        </div>
      )}
    </div>
  )
}
