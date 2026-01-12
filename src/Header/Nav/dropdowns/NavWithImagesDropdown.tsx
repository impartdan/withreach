import type { Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'

interface NavWithImagesDropdownProps {
  links?: Array<{
    link?: {
      type?: string
      label?: string | null
      url?: string | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages' | 'posts'
        value: string | any
      } | null
    }
    image?: string | Media | null
  }> | null
}

export const NavWithImagesDropdown: React.FC<NavWithImagesDropdownProps> = ({ links }) => {
  if (!links || links.length === 0) return null

  // Find the first item with an image to display on the right
  const itemWithImage = links.find((item: any) => item.image)
  const linkItems = links.filter((item: any) => item.link)

  return (
    <div className="flex min-w-[640px] max-w-[800px]">
      {/* Left side - Links */}
      <div className="flex-1 p-8">
        <div className="flex flex-col gap-1">
          {linkItems.map((item: any, index: number) => {
            if (!item.link) return null

            return (
              <CMSLink
                key={index}
                type={item.link.type}
                url={item.link.url}
                newTab={item.link.newTab}
                reference={item.link.reference}
                label={item.link.label}
                className="group py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors block"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <div className="text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors flex items-center gap-1">
                      {item.link.label}
                      <span className="text-gray-400">›</span>
                    </div>
                    {/* You can add descriptions here if needed in the future */}
                  </div>
                </div>
              </CMSLink>
            )
          })}
        </div>
      </div>

      {/* Right side - Image */}
      {itemWithImage?.image && (
        <div className="w-[280px] bg-gray-50 p-6 flex items-center justify-center">
          <div className="relative w-full h-full max-h-[300px]">
            <MediaComponent
              resource={itemWithImage.image}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
