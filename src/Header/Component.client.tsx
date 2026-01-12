'use client'
import { Link } from 'next-view-transitions'
import React from 'react'

import type { Header, Post } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  latestPosts: Post[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, latestPosts }) => {
  return (
    <header className="fixed top-0 z-30 w-full ">
      <div className="px-10 pt-9 pb-6 group ">
        <div className=" bg-white/60 group-hover:bg-white/100 backdrop-blur-lg transition-all duration-300 pl-[30px] pr-[10px] py-2 rounded-lg">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <Logo className="text-black" />
            </Link>
            <HeaderNav menuItems={data.menuItems} additionalLinks={data.additionalLinks} latestPosts={latestPosts} />
          </div>
        </div>
      </div>
    </header>
  )
}
