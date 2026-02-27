'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { AnimatePresence, motion } from 'framer-motion'

interface MobileNavProps {
  isMenuOpen: boolean
  onClose: () => void
  menuItems: Header['menuItems']
  additionalLinks: Header['additionalLinks']
  topOffset: number
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isMenuOpen,
  onClose,
  menuItems = [],
  additionalLinks = [],
  topOffset,
}) => {
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

  return (
    <div
      style={{ top: 0, minHeight: `100dvh` }}
      className={`fixed left-0 right-0 w-full flex flex-col bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-20 lg:hidden ${
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Scrollable content area that fills remaining height */}
      <div className="flex-1 flex flex-col px-8 pt-6 md:pt-40 overflow-y-auto">
        {/* Nav items */}
        <nav className="flex flex-col gap-6">
          {menuItems?.map((item, i) => {
            if (item.type === 'link' && item.link) {
              return (
                <div key={i} onClick={onClose}>
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
                            <div key={j} onClick={onClose}>
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
        </nav>

        {/* Additional links pinned to the bottom */}
        {additionalLinks && additionalLinks.length > 0 && (
          <div className="mt-auto pb-8 pt-6 flex flex-col gap-4">
            <div className="w-full h-px bg-gray-200" />
            {additionalLinks.map((item, i) => {
              if (!item.link) return null

              if (item.style === 'primary') {
                return (
                  <div key={`mobile-${i}`} onClick={onClose}>
                    <Button asChild className="w-full">
                      <CMSLink {...item.link} />
                    </Button>
                  </div>
                )
              }

              return (
                <div key={`mobile-${i}`} onClick={onClose} className="text-center">
                  <CMSLink
                    {...item.link}
                    className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 block"
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
