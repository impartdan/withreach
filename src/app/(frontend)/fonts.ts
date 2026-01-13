import localFont from 'next/font/local'

// Season Mix - Mixed serif/sans hybrid
export const SeasonMix = localFont({
  src: [
    {
      path: '../../../public/fonts/SeasonMixVF.woff2',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SeasonMixItalicsVF.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-mix',
  display: 'swap',
})

// Season Sans - Default sans serif
export const SeasonSans = localFont({
  src: [
    {
      path: '../../../public/fonts/SeasonSansVF.woff2',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SeasonSansItalicsVF.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

// Season Serif - Default serif
export const SeasonSerif = localFont({
  src: [
    {
      path: '../../../public/fonts/SeasonSerifVF.woff2',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SeasonSerifItalicsVF.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
})
