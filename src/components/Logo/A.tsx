import clsx from 'clsx'

interface AProps {
  className?: string
}

export function A({ className }: AProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="95"
      height="102"
      fill="none"
      viewBox="0 0 95 102"
      className={clsx('fill-current', className)}
    >
      <path
        fill="currentColor"
        d="m1.684 92.64 34.57-90.48c.5-1.3 1.75-2.16 3.14-2.16h15.12c1.39 0 2.64.86 3.14 2.16l34.71 90.48 1.43 3.52c1.07 2.63-.87 5.5-3.71 5.5h-13.1c-1.69 0-3.19-1.06-3.76-2.65l-2.29-6.38-3.98-10.78a3.37 3.37 0 0 0-3.15-2.2h-33.67c-1.41 0-2.67.88-3.15 2.2l-6.4 17.19a3.99 3.99 0 0 1-3.75 2.6H4.004c-2.83 0-4.77-2.86-3.71-5.49l1.42-3.53zm56.3-35.25-7.88-21.55c-1.08-2.94-5.24-2.94-6.31 0l-7.88 21.55c-.8 2.19.82 4.52 3.16 4.52h15.77c2.33 0 3.96-2.32 3.16-4.52z"
      />
    </svg>
  )
}
