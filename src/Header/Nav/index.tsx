'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { BasicDropdown } from './dropdowns/BasicDropdown'
import { NavWithImagesDropdown } from './dropdowns/NavWithImagesDropdown'
import { FeaturedWithListDropdown } from './dropdowns/FeaturedWithListDropdown'
import { TwoColumnShowcaseDropdown } from './dropdowns/TwoColumnShowcaseDropdown'
import { FeaturedIntegrationsDropdown } from './dropdowns/FeaturedIntegrationsDropdown'
import { ContentGridDropdown } from './dropdowns/ContentGridDropdown'
import { SimpleLinksWithFeatureDropdown } from './dropdowns/SimpleLinksWithFeatureDropdown'

type MenuItem = NonNullable<Header['menuItems']>[number]

interface HeaderNavProps {
  menuItems?: Header['menuItems']
  additionalLinks?: Header['additionalLinks']
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ menuItems = [], additionalLinks = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

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
                <div key={i} className="relative dropdown-container">
                  <button
                    onClick={() => toggleDropdown(i)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.dropdownLabel}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${activeDropdown === i ? 'rotate-180' : ''}`}
                    />
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
                        {item.dropdown?.layout === 'featuredWithList' && (
                          <FeaturedWithListDropdown
                            items={item.dropdown.fwlItems as any}
                            featuredCard={item.dropdown.fwlCard as any}
                          />
                        )}
                        {item.dropdown?.layout === 'twoColumnShowcase' && (
                          <TwoColumnShowcaseDropdown
                            items={item.dropdown.tcsItems as any}
                            mode={item.dropdown.tcsMode as any}
                            post={item.dropdown.tcsPost as any}
                          />
                        )}
                        {item.dropdown?.layout === 'featuredIntegrations' && (
                          <FeaturedIntegrationsDropdown
                            items={item.dropdown.fiItems as any}
                            integrations={item.dropdown.fiIntegrations as any}
                          />
                        )}
                        {item.dropdown?.layout === 'contentGrid' && (
                          <ContentGridDropdown
                            items={item.dropdown.cgItems as any}
                            contentCards={item.dropdown.cgCards as any}
                          />
                        )}
                        {item.dropdown?.layout === 'simpleLinksWithFeature' && (
                          <SimpleLinksWithFeatureDropdown
                            links={item.dropdown.slfLinks as any}
                            featuredArticle={item.dropdown.slfArticle as any}
                          />
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
