'use client'
import React from 'react'
import { Link } from 'next-view-transitions'

import { cn } from '@/utilities/ui'

type ArchivePaginationProps = {
  currentPage: number
  totalPages: number
  activeCategory: string | null
  basePath?: string
}

function buildHref(page: number, category: string | null, basePath: string) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return `${basePath}${qs ? `?${qs}` : ''}`
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = []

  if (current <= 3) {
    pages.push(1, 2, 3, 'ellipsis', total - 2, total - 1, total)
  } else if (current >= total - 2) {
    pages.push(1, 2, 3, 'ellipsis', total - 2, total - 1, total)
  } else {
    pages.push(1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total)
  }

  return pages
}

export const ArchivePagination: React.FC<ArchivePaginationProps> = ({
  currentPage,
  totalPages,
  activeCategory,
  basePath = '/resources/news',
}) => {
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div className="border-t border-brand-gray-light/50 pt-5 mt-xl">
      <nav className="flex items-center justify-between" aria-label="Pagination">
        <div className="flex items-center gap-6">
          {hasPrev ? (
            <Link
              href={buildHref(currentPage - 1, activeCategory, basePath)}
              className="flex items-center gap-6 group"
            >
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand-black"
              >
                <path
                  d="M10 1L2 10M2 10L10 19M2 10H38"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="type-micro-b text-brand-black">Previous</span>
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand-gray-light"
              >
                <path
                  d="M10 1L2 10M2 10L10 19M2 10H38"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="type-micro-b text-brand-gray-light">Previous</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-10">
          {pageNumbers.map((item, i) => {
            if (item === 'ellipsis') {
              return (
                <span key={`ellipsis-${i}`} className="type-micro-b text-brand-gray-light">
                  ...
                </span>
              )
            }

            const isActive = item === currentPage

            return isActive ? (
              <span
                key={item}
                className="type-micro-b text-brand-black"
                aria-current="page"
              >
                {item}
              </span>
            ) : (
              <Link
                key={item}
                href={buildHref(item, activeCategory, basePath)}
                className="type-micro-b text-brand-gray-light hover:text-brand-black transition-colors"
              >
                {item}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-6">
          {hasNext ? (
            <Link
              href={buildHref(currentPage + 1, activeCategory, basePath)}
              className="flex items-center gap-6 group"
            >
              <span className="type-micro-b text-brand-black">Next</span>
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand-black"
              >
                <path
                  d="M30 1L38 10M38 10L30 19M38 10H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <span className="type-micro-b text-brand-gray-light">Next</span>
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand-gray-light"
              >
                <path
                  d="M30 1L38 10M38 10L30 19M38 10H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
