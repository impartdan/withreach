import { cn } from '@/utilities/ui'

export const getTrioCardsContainerClasses = (cardCount: number) =>
  cn(
    'flex overflow-x-auto -mx-4 px-4 pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-6 md:overflow-x-visible md:mx-0 md:px-0 md:pb-0 md:grid',
    cardCount === 2 && 'md:grid-cols-2',
    cardCount > 2 && 'md:grid-cols-2 lg:grid-cols-3',
  )

export const getTrioCardItemClasses = (baseClasses: string) =>
  cn(
    'w-full shrink-0 snap-center md:w-auto',
    baseClasses,
  )
