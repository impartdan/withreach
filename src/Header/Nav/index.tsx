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
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  menuItems = [],
  additionalLinks = [],
  latestPosts,
  latestCaseStudies,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null)

  const toggleMobileAccordion = (index: number) => {
    setMobileAccordion(mobileAccordion === index ? null : index)
  }

  const getMobileItems = (item: NonNullable<typeof menuItems>[number]) => {
    if (item.type !== 'dropdown' || !item.dropdown) return []
    const { layout } = item.dropdown
    if (layout === 'featuredWithList') return item.dropdown.fwlItems ?? []
    if (layout === 'twoColumnShowcase') return item.dropdown.tcsItems ?? []
    if (layout === 'featuredIntegrations') return item.dropdown.fiItems ?? []
    if (layout === 'contentGrid') return item.dropdown.cgItems ?? []
    return []
  }

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
                  contentType={
                    menuItems[activeDropdown].dropdown.tcsContentType ?? 'posts'
                  }
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

      {/* Mobile Slide-in Menu - Slides from top */}
      <div
        className={`fixed left-0 right-0 w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'top-0 translate-y-0' : '-top-full -translate-y-full'
        } lg:hidden`}
      >
        {/* Close button row — matches header's p-3 outer + pl-[21px] pr-[17px] py-2 inner */}
        <div className="p-3">
          <div className="pl-[21px] pr-[17px] py-2 flex justify-end">
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
        </div>

        <div className="px-8 pb-8">
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
                const mobileItems = getMobileItems(item)
                const isOpen = mobileAccordion === i
                return (
                  <div key={i}>
                    <button
                      onClick={() => toggleMobileAccordion(i)}
                      className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
                    >
                      {item.dropdownLabel}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && mobileItems.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pl-4 pb-2 border-l-2 border-gray-200 ml-1 mt-1">
                            {mobileItems.map((subItem, j) => (
                              <div key={j} onClick={() => setIsMenuOpen(false)}>
                                <CMSLink
                                  {...subItem.link}
                                  className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                />
                                {subItem.description && (
                                  <p className="text-sm text-gray-400 -mt-1 pb-1">
                                    {subItem.description}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
                    <div
                      key={`mobile-${i}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-center"
                    >
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
