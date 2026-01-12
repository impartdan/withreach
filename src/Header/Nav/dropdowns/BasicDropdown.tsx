import { CMSLink } from '@/components/Link'

interface BasicDropdownProps {
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
  }> | null
}

export const BasicDropdown: React.FC<BasicDropdownProps> = ({ links }) => {
  if (!links || links.length === 0) return null

  return (
    <div className="p-6 min-w-[280px]">
      <div className="flex flex-col gap-2">
        {links.map((item: any, index: number) => {
          if (!item.link) return null

          return (
            <CMSLink
              key={index}
              type={item.link.type}
              url={item.link.url}
              newTab={item.link.newTab}
              reference={item.link.reference}
              label={item.link.label}
              className="text-gray-900 hover:text-gray-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
            />
          )
        })}
      </div>
    </div>
  )
}
