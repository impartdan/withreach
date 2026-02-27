import { cn } from '@/utilities/ui'

export const getTrioCardsContainerClasses = (cardCount: number) =>
  cn(
    'flex overflow-x-auto -mx-4 px-4 pb-2 scroll-smooth snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-6 md:overflow-x-visible md:mx-0 md:px-0 md:pb-0 md:grid',
    cardCount === 2 && 'md:grid-cols-2',
    cardCount > 2 && 'md:grid-cols-2 lg:grid-cols-3',
  )

export const getTrioCardItemClasses = (index: number, baseClasses: string) =>
  cn(
    'w-[calc(100vw-5rem)] shrink-0 md:w-auto',
    index === 0 ? 'snap-none' : 'snap-start',
    baseClasses,
  )
