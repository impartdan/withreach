'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Header, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'

type MenuItem = NonNullable<Header['menuItems']>[number]

interface HeaderNavProps {
  menuItems?: Header['menuItems']
  additionalLinks?: Header['additionalLinks']
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ menuItems = [], additionalLinks = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  return (
    <>
      <nav className="flex items-center gap-8">
        {/* Desktop Nav Items - Hidden on large and below */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems?.map((item, i) => {
            if (item.type === 'link' && item.link) {
              return (
                <CMSLink
                  key={i}
                  {...item.link}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                />
              )
            }

          if (item.type === 'dropdown' && item.dropdownLabel) {
                return (
                  <div
                    key={i}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(i)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                      {item.dropdownLabel}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === i && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                          {item.dropdown?.layout === 'basic' && (
                            <BasicDropdown links={item.dropdown.childLinks as any} />
                          )}
                          {item.dropdown?.layout === 'navWithImages' && (
                            <NavWithImagesDropdown links={item.dropdown.navWithImagesLinks as any} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

            return null
          })}

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

        {/* Additional Links - Visible on md and up */}
        {additionalLinks?.map((item, i) => {
          if (!item.link) return null
          
          if (item.style === 'primary') {
            return (
              <Button key={i} asChild className="hidden md:inline-flex">
                <CMSLink {...item.link} />
              </Button>
            )
          }
          
          return (
            <CMSLink
              key={i}
              {...item.link}
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            />
          )
        })}
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
            {menuItems?.map((item, i) => {
              if (item.type === 'link' && item.link) {
                return (
                  <div key={i} onClick={() => setIsMenuOpen(false)}>
                    <CMSLink
                      {...item.link}
                      className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 block"
                    />
                  </div>
                )
              }

              if (item.type === 'dropdown' && item.dropdownLabel) {
                return (
                  <button
                    key={i}
                    onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                    className="flex items-center justify-between text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
                  >
                    {item.dropdownLabel}
                    <ChevronDown className="w-5 h-5" />
                  </button>
                )
              }

              return null
            })}

            {/* Additional Links in Mobile Menu */}
            {additionalLinks && additionalLinks.length > 0 && (
              <>
                <div className="w-full h-px bg-gray-300 my-2" />
                {additionalLinks.map((item, i) => {
                  if (!item.link) return null
                  
                  if (item.style === 'primary') {
                    return (
                      <div key={`mobile-${i}`} onClick={() => setIsMenuOpen(false)}>
                        <Button asChild className="w-full">
                          <CMSLink {...item.link} />
                        </Button>
                      </div>
                    )
                  }
                  
                  return (
                    <div key={`mobile-${i}`} onClick={() => setIsMenuOpen(false)}>
                      <CMSLink
                        {...item.link}
                        className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 block"
                      />
                    </div>
                  )
                })}
              </>
            )}
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

// Basic Dropdown Component
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

const BasicDropdown: React.FC<BasicDropdownProps> = ({ links }) => {
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

// Nav with Images Dropdown Component
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

const NavWithImagesDropdown: React.FC<NavWithImagesDropdownProps> = ({ links }) => {
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
