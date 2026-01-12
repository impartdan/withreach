'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export const HeaderNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Product', href: '#' },
    { label: 'Solutions', href: '#' },
    { label: 'Ecosystem', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Support', href: '#' },
  ]

  return (
    <>
      <nav className="flex items-center gap-8">
        {/* Desktop Nav Items - Hidden on large and below */}
        <div className="hidden lg:flex items-center gap-8">
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
        </div>

        {/* Hamburger Menu Button - Visible on large and below */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>

        {/* Sign In and Book a Call - Visible on md and up */}
        <Link
          href="#"
          className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Sign In
        </Link>

        <Link
          href="#"
          className="hidden md:block px-6 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
        >
          Book a Call
        </Link>
      </nav>

      {/* Mobile Slide-in Menu - Slides from top */}
      <div
        className={`fixed left-0 right-0 w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'top-0 translate-y-0' : '-top-full -translate-y-full'
        } lg:hidden`}
      >
        <div className="p-8">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              aria-label="Close menu"
            >
              <span className="w-6 h-0.5 bg-gray-700 rotate-45 translate-y-2" />
              <span className="w-6 h-0.5 bg-gray-700 opacity-0" />
              <span className="w-6 h-0.5 bg-gray-700 -rotate-45 -translate-y-2" />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
              >
                {item.label}
                <ChevronDown className="w-5 h-5" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
