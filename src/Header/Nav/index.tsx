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
                          {item.dropdown?.layout === 'featuredWithList' && (
                            <FeaturedWithListDropdown
                              items={item.dropdown.fwlItems as any}
                              featuredCard={item.dropdown.fwlCard as any}
                            />
                          )}
                          {item.dropdown?.layout === 'twoColumnShowcase' && (
                            <TwoColumnShowcaseDropdown
                              items={item.dropdown.tcsItems as any}
                              centerImage={item.dropdown.centerImage as any}
                              showcaseCard={item.dropdown.tcsCard as any}
                            />
                          )}
                          {item.dropdown?.layout === 'featuredIntegrations' && (
                            <FeaturedIntegrationsDropdown
                              items={item.dropdown.fiItems as any}
                              sectionTitle={item.dropdown.fiTitle as any}
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

// Featured with List Dropdown Component
interface FeaturedWithListDropdownProps {
  items?: Array<{
    title?: string
    description?: string
    link?: any
  }> | null
  featuredCard?: {
    heading?: string
    callToActionText?: string
    backgroundImage?: string | Media | null
    link?: any
  } | null
}

const FeaturedWithListDropdown: React.FC<FeaturedWithListDropdownProps> = ({ items, featuredCard }) => {
  if (!items && !featuredCard) return null

  return (
    <div className="flex gap-16 p-10 min-w-[884px]">
      {/* Left side - List Items */}
      <div className="flex-1 flex flex-col gap-8">
        {items?.map((item, index) => (
          <div key={index} className="group">
            <CMSLink {...item.link} className="block">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-[22px] font-normal text-[#04212F] group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <svg width="4" height="7" viewBox="0 0 4 7" className="mt-3" fill="none">
                  <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
                </svg>
              </div>
              {item.description && (
                <p className="text-base font-medium text-[#04212F]">{item.description}</p>
              )}
            </CMSLink>
          </div>
        ))}
      </div>

      {/* Right side - Featured Card */}
      {featuredCard && (
        <div className="w-[382px] h-[340px] rounded-lg overflow-hidden relative group">
          {featuredCard.backgroundImage && (
            <div className="absolute inset-0">
              <MediaComponent
                resource={featuredCard.backgroundImage}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-[#999177] flex items-center justify-center">
            <div className="text-center space-y-4 px-8">
              {featuredCard.heading && (
                <h3 className="text-4xl font-normal text-[#999177] bg-[#1E1A15] px-3 py-2 rounded inline-block">
                  {featuredCard.heading.split(' ').slice(0, 2).join(' ')}
                </h3>
              )}
              {featuredCard.heading && featuredCard.heading.split(' ').length > 2 && (
                <h3 className="text-4xl font-normal text-white bg-[#1E1A15] px-3 py-2 rounded inline-block">
                  {featuredCard.heading.split(' ').slice(2).join(' ')}
                </h3>
              )}
            </div>
          </div>
          {featuredCard.link && (
            <CMSLink {...featuredCard.link} className="absolute inset-0" />
          )}
        </div>
      )}
    </div>
  )
}

// Two-Column with Showcase Dropdown Component
interface TwoColumnShowcaseDropdownProps {
  items?: Array<{
    title?: string
    description?: string
    link?: any
  }> | null
  centerImage?: string | Media | null
  showcaseCard?: {
    image?: string | Media | null
    tags?: Array<{ tag?: string }> | null
    heading?: string
    link?: any
  } | null
}

const TwoColumnShowcaseDropdown: React.FC<TwoColumnShowcaseDropdownProps> = ({
  items,
  centerImage,
  showcaseCard,
}) => {
  if (!items && !showcaseCard) return null

  return (
    <div className="flex gap-16 p-10 min-w-[915px]">
      {/* Left side - List Items */}
      <div className="flex-1 flex flex-col gap-8">
        {items?.map((item, index) => (
          <div key={index} className="group">
            <CMSLink {...item.link} className="block">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-[22px] font-normal text-[#04212F] group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <svg width="4" height="7" viewBox="0 0 4 7" className="mt-3" fill="none">
                  <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
                </svg>
              </div>
              {item.description && (
                <p className="text-base font-medium text-[#04212F]">{item.description}</p>
              )}
            </CMSLink>
          </div>
        ))}
      </div>

      {/* Center Image */}
      {centerImage && (
        <div className="w-[259px] h-[199px] relative">
          <MediaComponent resource={centerImage} className="w-full h-full object-contain" />
        </div>
      )}

      {/* Right side - Showcase Card */}
      {showcaseCard && (
        <div className="w-[382px] space-y-8">
          {showcaseCard.image && (
            <div className="w-full h-[247px] rounded-lg overflow-hidden">
              <MediaComponent
                resource={showcaseCard.image}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {showcaseCard.tags && showcaseCard.tags.length > 0 && (
            <div className="flex gap-6">
              {showcaseCard.tags.map((tagItem, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-[#EEECE6] rounded-full text-sm text-[#1E1A15]"
                >
                  {tagItem.tag}
                </span>
              ))}
            </div>
          )}
          {showcaseCard.heading && showcaseCard.link && (
            <CMSLink {...showcaseCard.link}>
              <h3 className="text-5xl font-normal text-[#181D27] leading-tight hover:text-gray-600 transition-colors">
                {showcaseCard.heading}
              </h3>
            </CMSLink>
          )}
        </div>
      )}
    </div>
  )
}

// Featured Integrations Dropdown Component
interface FeaturedIntegrationsDropdownProps {
  items?: Array<{
    title?: string
    description?: string
    link?: any
  }> | null
  sectionTitle?: string
  integrations?: Array<{
    integration?: any
    customName?: string
    customLogo?: string | Media | null
    link?: any
  }> | null
}

const FeaturedIntegrationsDropdown: React.FC<FeaturedIntegrationsDropdownProps> = ({
  items,
  sectionTitle,
  integrations,
}) => {
  if (!items && !integrations) return null

  return (
    <div className="flex gap-10 p-10 min-w-[914px]">
      {/* Left side - List Items */}
      <div className="flex-1 flex flex-col gap-10">
        {items?.map((item, index) => (
          <div key={index} className="group">
            <CMSLink {...item.link} className="block">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-[22px] font-normal text-[#04212F] group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <svg width="4" height="7" viewBox="0 0 4 7" className="mt-3" fill="none">
                  <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
                </svg>
              </div>
              {item.description && (
                <p className="text-base font-medium text-[#04212F]">{item.description}</p>
              )}
            </CMSLink>
          </div>
        ))}
      </div>

      {/* Right side - Integrations */}
      <div className="w-[409px] space-y-6">
        {sectionTitle && (
          <p className="text-base font-medium text-[#1E1A15]">{sectionTitle}</p>
        )}
        <div className="space-y-4">
          {integrations?.map((item, index) => {
            const integrationName =
              item.customName ||
              (typeof item.integration === 'object' ? item.integration?.title : '')
            const integrationLogo =
              item.customLogo ||
              (typeof item.integration === 'object' ? item.integration?.logo : null)

            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#EEECE6] rounded-[10px] group hover:bg-[#E5E3DD] transition-colors"
              >
                <div className="flex items-center gap-4">
                  {integrationLogo && (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <MediaComponent
                        resource={integrationLogo}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  )}
                  <span className="text-[40px] font-normal text-[#1E1A15] leading-[44px]">
                    {integrationName}
                  </span>
                </div>
                {item.link && (
                  <CMSLink {...item.link} className="flex items-center gap-3 text-base font-semibold text-[#1E1A15]">
                    <span>Explore</span>
                    <svg width="4" height="8" viewBox="0 0 4 8" fill="none">
                      <path d="M0.5 0.5L3.5 4L0.5 7.5" stroke="#1E1A15" strokeWidth="1.5" />
                    </svg>
                  </CMSLink>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Content Grid Dropdown Component
interface ContentGridDropdownProps {
  items?: Array<{
    title?: string
    description?: string
    link?: any
  }> | null
  contentCards?: Array<{
    image?: string | Media | null
    tags?: Array<{ tag?: string }> | null
    heading?: string
    link?: any
  }> | null
}

const ContentGridDropdown: React.FC<ContentGridDropdownProps> = ({ items, contentCards }) => {
  if (!items && !contentCards) return null

  return (
    <div className="flex gap-16 p-10 min-w-[1207px]">
      {/* Left side - List Items */}
      <div className="flex-1 flex flex-col gap-8">
        {items?.map((item, index) => (
          <div key={index} className="group">
            <CMSLink {...item.link} className="block">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-[22px] font-normal text-[#04212F] group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <svg width="4" height="7" viewBox="0 0 4 7" className="mt-3" fill="none">
                  <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
                </svg>
              </div>
              {item.description && (
                <p className="text-base font-medium text-[#04212F]">{item.description}</p>
              )}
            </CMSLink>
          </div>
        ))}
      </div>

      {/* Right side - Content Cards Grid */}
      <div className="flex gap-10">
        {contentCards?.map((card, index) => (
          <div key={index} className="w-[317px] space-y-8 group">
            {card.image && (
              <div className="w-full h-[247px] rounded-lg overflow-hidden">
                <MediaComponent
                  resource={card.image}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {card.tags && card.tags.length > 0 && (
              <div className="flex gap-6">
                {card.tags.map((tagItem, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-2 bg-[#EEECE6] rounded-full text-sm text-[#1E1A15]"
                  >
                    {tagItem.tag}
                  </span>
                ))}
              </div>
            )}
            {card.heading && card.link && (
              <CMSLink {...card.link}>
                <h3 className="text-5xl font-normal text-[#181D27] leading-tight group-hover:text-gray-600 transition-colors">
                  {card.heading}
                </h3>
              </CMSLink>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Simple Links with Feature Dropdown Component
interface SimpleLinksWithFeatureDropdownProps {
  links?: Array<{
    link?: any
  }> | null
  featuredArticle?: {
    heading?: string
    backgroundImage?: string | Media | null
    link?: any
  } | null
}

const SimpleLinksWithFeatureDropdown: React.FC<SimpleLinksWithFeatureDropdownProps> = ({
  links,
  featuredArticle,
}) => {
  if (!links && !featuredArticle) return null

  return (
    <div className="flex gap-16 p-10 min-w-[854px]">
      {/* Left side - Simple Links */}
      <div className="flex-1 flex flex-col gap-8">
        {links?.map((item, index) => (
          <CMSLink
            key={index}
            {...item.link}
            className="flex items-center gap-2 text-[22px] font-normal text-[#04212F] hover:text-gray-600 transition-colors group"
          >
            <span>{item.link?.label}</span>
            <svg width="4" height="7" viewBox="0 0 4 7" className="mt-1" fill="none">
              <path d="M0.5 0.5L3.5 3.5L0.5 6.5" stroke="#284854" strokeWidth="1.5" />
            </svg>
          </CMSLink>
        ))}
      </div>

      {/* Right side - Featured Article */}
      {featuredArticle && (
        <div className="w-[442px] h-[340px] rounded-lg overflow-hidden relative group">
          {featuredArticle.backgroundImage && (
            <div className="absolute inset-0">
              <MediaComponent
                resource={featuredArticle.backgroundImage}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-[#999177] flex items-center justify-center">
            <div className="text-center space-y-4 px-8">
              {featuredArticle.heading && (
                <>
                  <h3 className="text-4xl font-normal text-[#999177] bg-[#1E1A15] px-3 py-2 rounded inline-block">
                    {featuredArticle.heading.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  {featuredArticle.heading.split(' ').length > 2 && (
                    <h3 className="text-4xl font-normal text-white bg-[#1E1A15] px-3 py-2 rounded inline-block">
                      {featuredArticle.heading.split(' ').slice(2).join(' ')}
                    </h3>
                  )}
                </>
              )}
            </div>
          </div>
          {featuredArticle.link && (
            <CMSLink {...featuredArticle.link} className="absolute inset-0" />
          )}
        </div>
      )}
    </div>
  )
}
