import clsx from 'clsx'

interface HProps {
  className?: string
}

export function H({ className }: HProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="85"
      height="102"
      fill="none"
      viewBox="0 0 85 102"
      className={clsx('fill-current', className)}
    >
      <path
        fill="currentColor"
        d="M60.51 57.81H23.66c-1.86 0-3.36 1.5-3.36 3.36V98.3c0 1.86-1.5 3.36-3.36 3.36H3.36c-1.86 0-3.36-1.5-3.36-3.36V3.36C0 1.5 1.5 0 3.36 0h13.58c1.86 0 3.36 1.5 3.36 3.36v33.32c0 1.86 1.5 3.36 3.36 3.36h36.85c1.86 0 3.36-1.5 3.36-3.36V3.36c0-1.86 1.5-3.36 3.36-3.36h13.58c1.86 0 3.36 1.5 3.36 3.36V98.3c0 1.86-1.5 3.36-3.36 3.36H67.23c-1.86 0-3.36-1.5-3.36-3.36V61.17c0-1.86-1.5-3.36-3.36-3.36"
      />
    </svg>
  )
}
