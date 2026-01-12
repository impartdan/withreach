import clsx from 'clsx'

interface CProps {
  className?: string
}

export function C({ className }: CProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="97"
      height="105"
      fill="none"
      viewBox="0 0 97 105"
      className={clsx('fill-current', className)}
    >
      <path
        fill="currentColor"
        d="M0 52.17C0 17.48 23.97 0 50.62 0c23.06 0 41.01 11.83 45.43 29.76.47 1.89-.76 3.78-2.67 4.13l-13.79 2.42c-2.35.41-4.68-.89-5.52-3.13C70.61 24 61.53 17.77 50.49 17.77c-16.64 0-29.75 11.99-29.75 34.41s12.97 34.55 29.75 34.55c11.46 0 20.33-5.96 23.6-16.27.72-2.26 3.01-3.64 5.37-3.35l13.81 1.69c2.01.25 3.34 2.21 2.85 4.18-5.07 20.58-23.52 31.52-45.49 31.52C23.42 104.5.01 86.87.01 52.19z"
      />
    </svg>
  )
}
