import Link from 'next/link'
import React from 'react'

interface BackButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

export const BackButton: React.FC<BackButtonProps> = ({ href, children, className }) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-brand-black text-base font-sans font-semibold hover:opacity-70 transition-opacity${className ? ` ${className}` : ''}`}
    >
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4.89453 8.75L0.751674 4.75L4.89453 0.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </Link>
  )
}
