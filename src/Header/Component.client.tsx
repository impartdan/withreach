'use client'
import { Link } from 'next-view-transitions'

import type { Header, Post } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  latestPosts: Post[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, latestPosts }) => {
  return (
    <header className="fixed top-0 z-30 w-full">
      <div className="p-3 md:px-10 md:pt-9 md:pb-6 group">
        <div className="relative rounded-[10px]">
          {/* Blur background layer — no ancestor has view-transition-name, so backdrop-filter works */}
          <div className="absolute inset-0 bg-white/60 group-hover:bg-white/100 backdrop-blur-lg transition-all duration-300 rounded-[10px]" />
          {/* Content layer — carries view-transition-name as a sibling, not an ancestor of the blur */}
          <div className="relative [view-transition-name:header] pl-[21px] md:pl-[30px] pr-[17px] md:pr-[10px] py-2">
            <div className="flex items-center justify-between">
              <Link href="/" title="Home" className="flex-shrink-0">
                <Logo className="text-black" />
              </Link>
              <HeaderNav
                menuItems={data.menuItems}
                additionalLinks={data.additionalLinks}
                latestPosts={latestPosts}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
