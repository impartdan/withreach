'use client'

import React, { useState, useTransition, useCallback } from 'react'

import type { Category } from '@/payload-types'
import { CategoryFilter } from '@/components/NewsArchive/CategoryFilter'
import { ArchivePagination } from '@/components/NewsArchive/ArchivePagination'
import { PostArchiveGrid } from '@/components/NewsArchive/PostArchiveGrid'
import type { PostCardData } from '@/components/NewsArchive/PostCard'
import { CaseStudyGrid } from '@/components/CaseStudiesArchive/CaseStudyGrid'
import type { CaseStudyCardData } from '@/components/CaseStudiesArchive/CaseStudyCard'

type BrowseSectionProps = {
  variant: 'posts' | 'case-studies'
  initialDocs: PostCardData[] | CaseStudyCardData[]
  initialTotalPages: number
  initialPage: number
  initialCategory: string | null
  categories: Category[]
  basePath: string
  fetchAction: (category: string | null, page: number) => Promise<{ docs: PostCardData[] | CaseStudyCardData[]; totalPages: number; page: number }>
}

export function BrowseSection({
  variant,
  initialDocs,
  initialTotalPages,
  initialPage,
  initialCategory,
  categories,
  basePath,
  fetchAction,
}: BrowseSectionProps) {
  const [docs, setDocs] = useState(initialDocs)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory)
  const [isPending, startTransition] = useTransition()

  const updateUrl = useCallback((category: string | null, page: number) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    const url = `${basePath}${qs ? `?${qs}` : ''}#browse`
    window.history.replaceState(null, '', url)
  }, [basePath])

  const fetchAndUpdate = useCallback((category: string | null, page: number) => {
    startTransition(async () => {
      const result = await fetchAction(category, page)
      setDocs(result.docs)
      setTotalPages(result.totalPages)
      setCurrentPage(result.page)
      setActiveCategory(category)
      updateUrl(category, result.page)

      document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [fetchAction, updateUrl])

  const handleCategoryChange = useCallback((categorySlug: string | null) => {
    fetchAndUpdate(categorySlug, 1)
  }, [fetchAndUpdate])

  const handlePageChange = useCallback((page: number) => {
    fetchAndUpdate(activeCategory, page)
  }, [fetchAndUpdate, activeCategory])

  return (
    <div id="browse" className="bg-white scroll-mt-20">
      <div className="container">
        <div className="flex items-end justify-between border-t border-brand-gray-light/50 pt-sm pb-md">
          <h2 className="type-display-lg">Browse All</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            variant="dropdown"
            basePath={basePath}
            onChange={handleCategoryChange}
          />
        </div>
      </div>

      <div className="container pb-xl">
        <div className={isPending ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
          {variant === 'posts'
            ? <PostArchiveGrid posts={docs as PostCardData[]} />
            : <CaseStudyGrid caseStudies={docs as CaseStudyCardData[]} />
          }
        </div>

        {totalPages > 1 && (
          <ArchivePagination
            currentPage={currentPage}
            totalPages={totalPages}
            activeCategory={activeCategory}
            basePath={basePath}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
