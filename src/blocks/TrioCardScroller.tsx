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
  const [containerHeight, setContainerHeight] = React.useState<number | undefined>(undefined)

  const measureTallestCard = React.useCallback((scroller: HTMLElement) => {
    const cards = Array.from(scroller.children) as HTMLElement[]
    if (cards.length === 0) return undefined

    return cards.reduce((tallest, card) => Math.max(tallest, card.offsetHeight), 0)
  }, [])

  const update = React.useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    setCanScrollPrev(scroller.scrollLeft > 1)
    setCanScrollNext(scroller.scrollLeft < maxScroll - 1)

    const mobile = !window.matchMedia('(min-width: 768px)').matches

    if (!mobile) {
      setContainerHeight(undefined)
      return
    }

    const height = measureTallestCard(scroller)
    if (height !== undefined && height > 0) {
      setContainerHeight(height)
    }
  }, [measureTallestCard])

  React.useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    update()

    scroller.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      scroller.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update, cardCount])

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

      <div
        ref={scrollerRef}
        className={getTrioCardsContainerClasses(cardCount)}
        style={containerHeight !== undefined ? { minHeight: containerHeight } : undefined}
      >
        {children}
      </div>
    </>
  )
}
