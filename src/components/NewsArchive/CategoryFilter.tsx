'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'next-view-transitions'
import { useTransitionRouter } from 'next-view-transitions'

import type { Category } from '@/payload-types'
import { cn } from '@/utilities/ui'

type CategoryFilterProps = {
  categories: Category[]
  activeCategory: string | null
  variant: 'pills' | 'dropdown'
  basePath?: string
}

function buildHref(basePath: string, categorySlug?: string) {
  if (!categorySlug) return basePath
  return `${basePath}?category=${encodeURIComponent(categorySlug)}`
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  variant,
  basePath = '/resources/news',
}) => {
  if (variant === 'pills') {
    return <PillFilter categories={categories} activeCategory={activeCategory} basePath={basePath} />
  }

  return <DropdownFilter categories={categories} activeCategory={activeCategory} basePath={basePath} />
}

function PillFilter({
  categories,
  activeCategory,
  basePath,
}: {
  categories: Category[]
  activeCategory: string | null
  basePath: string
}) {
  return (
    <>
      <Link
        href={buildHref(basePath)}
        className={cn(
          'rounded-[6px] px-5 py-2.5 type-eyebrow transition-colors',
          !activeCategory
            ? 'bg-brand-black text-white'
            : 'bg-white text-brand-black hover:bg-brand-black/5',
        )}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={buildHref(basePath, cat.slug)}
          className={cn(
            'rounded-[6px] px-5 py-2.5 type-eyebrow transition-colors',
            activeCategory === cat.slug
              ? 'bg-brand-black text-white'
              : 'bg-white text-brand-black hover:bg-brand-black/5',
          )}
        >
          {cat.title}
        </Link>
      ))}
    </>
  )
}

function DropdownFilter({
  categories,
  activeCategory,
  basePath,
}: {
  categories: Category[]
  activeCategory: string | null
  basePath: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useTransitionRouter()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeLabel = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.title || 'Filter by type'
    : 'Filter by type'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between gap-4 rounded-[6px] border border-brand-gray-light/50 px-4 py-3 type-button min-w-[200px]',
          activeCategory ? 'text-brand-black' : 'text-brand-black',
        )}
      >
        <span>{activeLabel}</span>
        <span
          className={cn(
            'transition-transform text-lg leading-none',
            isOpen && 'rotate-45',
          )}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-brand-gray-light/30 py-2 min-w-[200px] z-50">
          <button
            onClick={() => {
              router.push(buildHref(basePath))
              setIsOpen(false)
            }}
            className={cn(
              'w-full text-left px-4 py-2.5 type-micro-b transition-colors hover:bg-brand-linen',
              !activeCategory && 'text-brand-black font-semibold',
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                router.push(buildHref(basePath, cat.slug))
                setIsOpen(false)
              }}
              className={cn(
                'w-full text-left px-4 py-2.5 type-micro-b transition-colors hover:bg-brand-linen',
                activeCategory === cat.slug && 'text-brand-black font-semibold',
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
