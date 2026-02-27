'use client'

import React from 'react'
import { getTrioCardsContainerClasses } from '@/blocks/trioCardScrollClasses'

type TrioCardScrollerProps = {
  cardCount: number
  children: React.ReactNode
}

export const TrioCardScroller: React.FC<TrioCardScrollerProps> = ({ cardCount, children }) => {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(cardCount > 1)

  const updateScrollState = React.useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth
    setCanScrollPrev(scroller.scrollLeft > 1)
    setCanScrollNext(scroller.scrollLeft < maxScrollLeft - 1)
  }, [])

  React.useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    updateScrollState()

    scroller.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      scroller.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState, cardCount])

  const scrollByCard = React.useCallback((direction: 'prev' | 'next') => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const firstCard = scroller.firstElementChild as HTMLElement | null
    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap || '0')
    const distance = (firstCard?.clientWidth || scroller.clientWidth * 0.9) + gap

    scroller.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      {cardCount > 1 && (
        <div className="mb-4 flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Scroll cards left"
            onClick={() => scrollByCard('prev')}
            disabled={!canScrollPrev}
            className="inline-flex h-5 w-10 items-center justify-center rounded-full border border-brand-black/20 text-brand-black transition disabled:cursor-not-allowed disabled:border-brand-black/10 disabled:text-brand-black/35"
          >
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 4H1M1 4L4 1M1 4L4 7" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll cards right"
            onClick={() => scrollByCard('next')}
            disabled={!canScrollNext}
            className="inline-flex h-5 w-10 items-center justify-center rounded-full border border-brand-black/20 text-brand-black transition disabled:cursor-not-allowed disabled:border-brand-black/10 disabled:text-brand-black/35"
          >
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4H17M17 4L14 1M17 4L14 7" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
      )}

      <div ref={scrollerRef} className={getTrioCardsContainerClasses(cardCount)}>
        {children}
      </div>
    </>
  )
}
