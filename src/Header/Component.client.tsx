'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="fixed top-0 z-30 w-full ">
      <div className="mx-10 mt-9 mb-6 ">
        <div className=" bg-white/60 hover:bg-white/100 transition-all duration-300 pl-[30px] pr-[10px] py-2 rounded-lg">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <Logo className="text-black" />
            </Link>
            <HeaderNav />
          </div>
        </div>
      </div>
    </header>
  )
}
