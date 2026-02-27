'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CaseStudy, Header, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { FeaturedWithListDropdown } from './dropdowns/FeaturedWithListDropdown'
import { TwoColumnShowcaseDropdown } from './dropdowns/TwoColumnShowcaseDropdown'
import { FeaturedIntegrationsDropdown } from './dropdowns/FeaturedIntegrationsDropdown'
import { ContentGridDropdown } from './dropdowns/ContentGridDropdown'
import { AnimatePresence, motion } from 'framer-motion'

interface HeaderNavProps {
  menuItems?: Header['menuItems']
  additionalLinks?: Header['additionalLinks']
  latestPosts: Post[]
  latestCaseStudies: CaseStudy[]
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  menuItems = [],
  additionalLinks = [],
  latestPosts,
  latestCaseStudies,
  isMenuOpen,
  onToggleMenu,
}) => {
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
      <nav className="flex items-center gap-8 dropdown-container">
        {/* Desktop Nav Items - Hidden on large and below */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems?.map((item, i) => {
            if (item.type === 'link' && item.link) {
              return (
                <CMSLink
                  key={i}
                  {...item.link}
                  className="text-base font-semibold text-brand-black hover:text-brand-gray transition-colors"
                />
              )
            }

            if (item.type === 'dropdown' && item.dropdownLabel) {
              return (
                <button
                  key={i}
                  onClick={() => toggleDropdown(i)}
                  className="flex items-center gap-1 text-base font-semibold text-brand-black hover:text-brand-gray transition-colors"
                >
                  {item.dropdownLabel}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeDropdown === i ? 'rotate-180' : ''}`}
                  />
                </button>
              )
            }

            return null
          })}

          <div className="w-px h-6 bg-gray-300" />
        </div>

        {/* Hamburger Menu Button - Visible on large and below */}
        <button
          onClick={onToggleMenu}
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
              <Button key={i} asChild className="hidden whitespace-nowrap md:inline-flex">
                <CMSLink {...item.link} />
              </Button>
            )
          }

          return (
            <CMSLink
              key={i}
              {...item.link}
              className="hidden whitespace-nowrap md:block text-base font-semibold text-brand-black hover:text-brand-gray transition-colors"
            />
          )
        })}
      </nav>

      {/* Centered Dropdown Menu - Fixed positioning relative to viewport */}
      <AnimatePresence>
        {activeDropdown !== null && menuItems?.[activeDropdown]?.type === 'dropdown' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0 } }}
            className="fixed left-0 right-0 z-50"
            style={{ top: '100px' }}
            onClick={() => setActiveDropdown(null)}
          >
            <div
              className={`mx-auto bg-white rounded-2xl shadow-2xl border max-w-full border-gray-200 overflow-hidden ${
                menuItems[activeDropdown].dropdown?.layout === 'contentGrid'
                  ? 'lg:max-w-[1207px]'
                  : 'lg:max-w-[884px]'
              }`}
            >
              {menuItems[activeDropdown].dropdown?.layout === 'featuredWithList' && (
                <FeaturedWithListDropdown
                  items={menuItems[activeDropdown].dropdown.fwlItems}
                  featuredCard={menuItems[activeDropdown].dropdown.fwlCard}
                />
              )}
              {menuItems[activeDropdown].dropdown?.layout === 'twoColumnShowcase' && (
                <TwoColumnShowcaseDropdown
                  items={menuItems[activeDropdown].dropdown.tcsItems}
                  mode={menuItems[activeDropdown].dropdown.tcsMode}
                  contentType={menuItems[activeDropdown].dropdown.tcsContentType ?? 'posts'}
                  post={menuItems[activeDropdown].dropdown.tcsPost}
                  caseStudy={menuItems[activeDropdown].dropdown.tcsCaseStudy}
                  latestPosts={latestPosts}
                  latestCaseStudies={latestCaseStudies}
                />
              )}
              {menuItems[activeDropdown].dropdown?.layout === 'featuredIntegrations' && (
                <FeaturedIntegrationsDropdown
                  items={menuItems[activeDropdown].dropdown.fiItems}
                  integrations={menuItems[activeDropdown].dropdown.fiIntegrations}
                />
              )}
              {menuItems[activeDropdown].dropdown?.layout === 'contentGrid' && (
                <ContentGridDropdown
                  items={menuItems[activeDropdown].dropdown.cgItems}
                  mode={menuItems[activeDropdown].dropdown.cgMode}
                  posts={menuItems[activeDropdown].dropdown.cgPosts}
                  latestPosts={latestPosts}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
