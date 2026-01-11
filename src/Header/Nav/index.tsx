'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export const HeaderNav: React.FC = () => {
  const navItems = [
    { label: 'Product', href: '#' },
    { label: 'Solutions', href: '#' },
    { label: 'Ecosystem', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Support', href: '#' },
  ]

  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          {item.label}
          <ChevronDown className="w-4 h-4" />
        </Link>
      ))}
      
      <div className="w-px h-6 bg-gray-300" />
      
      <Link
        href="#"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        Sign In
      </Link>
      
      <Link
        href="#"
        className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
      >
        Book a Call
      </Link>
    </nav>
  )
}
