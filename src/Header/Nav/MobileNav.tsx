'use client'

import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    if (isMenuOpen) setMobileAccordion(null)
  }, [isMenuOpen])

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

  const hasActiveDropdown = mobileAccordion !== null

  const secondaryLinks = additionalLinks?.filter((item) => item.style !== 'primary') ?? []
  const primaryButton = additionalLinks?.find((item) => item.style === 'primary') ?? null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-20 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: topOffset }}
        onClick={onClose}
      />

      {/* Card panel */}
      <div
        style={{ top: topOffset }}
        className={`fixed left-0 right-0 z-20 mx-3 lg:hidden transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="bg-white rounded-[10px] p-5 flex flex-col gap-20 overflow-y-auto"
          style={{ maxHeight: `calc(100dvh - ${topOffset}px - 12px)` }}
        >
          {/* Links section */}
          <div className="flex flex-col gap-6">
            {/* Primary nav items — 32px */}
            <div className="flex flex-col gap-3">
              {menuItems?.map((item, i) => {
                const isActive = mobileAccordion === i
                const isDimmed = hasActiveDropdown && !isActive

                if (item.type === 'link' && item.link) {
                  return (
                    <div key={i} onClick={onClose}>
                      <CMSLink
                        {...item.link}
                        className={`block type-display-md transition-colors duration-200 ${
                          isDimmed ? 'text-brand-gray-light' : 'text-brand-black'
                        }`}
                      />
                    </div>
                  )
                }

                if (item.type === 'dropdown' && item.dropdownLabel) {
                  const mobileItems = getMobileItems(item)
                  return (
                    <div key={i}>
                      <button
                        onClick={() => toggleMobileAccordion(i)}
                        className={`block text-left type-display-md transition-colors duration-200 w-full ${
                          isDimmed
                            ? 'text-brand-gray-light'
                            : isActive
                              ? '!font-semibold text-brand-black'
                              : 'text-brand-black'
                        }`}
                      >
                        {item.dropdownLabel}
                      </button>
                      <AnimatePresence initial={false}>
                        {isActive && mobileItems.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 mt-3">
                              {mobileItems.map((subItem, j) => (
                                <div key={j} onClick={onClose}>
                                  <CMSLink
                                    {...subItem.link}
                                    className="block type-display-md text-brand-black transition-colors"
                                  />
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
            </div>

            {/* Secondary links — 16px */}
            {secondaryLinks.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {secondaryLinks.map((item, i) => {
                  if (!item.link) return null
                  return (
                    <div key={i} onClick={onClose}>
                      <CMSLink
                        {...item.link}
                        className={`block type-micro-b transition-colors duration-200 ${
                          hasActiveDropdown ? 'text-brand-gray-light' : 'text-brand-black'
                        }`}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* CTA Button */}
          {primaryButton?.link && (
            <div onClick={onClose}>
              <Button asChild>
                <CMSLink {...primaryButton.link} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
