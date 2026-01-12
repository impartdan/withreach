import clsx from 'clsx'

interface EProps {
  className?: string
}

export function E({ className }: EProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="102"
      fill="none"
      viewBox="0 0 70 102"
      className={clsx('fill-current', className)}
    >
      <path
        fill="currentColor"
        d="M3.36 0h63.08c1.86 0 3.36 1.5 3.36 3.36v11.05c0 1.86-1.5 3.36-3.36 3.36H23.67c-1.86 0-3.36 1.5-3.36 3.36v14.99c0 1.86 1.5 3.36 3.36 3.36h33.04c1.86 0 3.36 1.5 3.36 3.36v11.05c0 1.86-1.5 3.36-3.36 3.36H23.67c-1.86 0-3.36 1.5-3.36 3.36v19.93c0 1.86 1.5 3.36 3.36 3.36h42.77c1.86 0 3.36 1.5 3.36 3.36v11.05c0 1.86-1.5 3.36-3.36 3.36H3.36c-1.86 0-3.36-1.5-3.36-3.36V3.36C0 1.5 1.5 0 3.36 0"
      />
    </svg>
  )
}
