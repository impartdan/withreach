import React from 'react'
import Link from 'next/link'
import { Logo as LogoComponent } from './Logo/Logo'

type Props = {
  className?: string
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FAF7F5',
      }}
    >
      <Link href="/">
        <LogoComponent className="text-black" />
      </Link>
    </div>
  )
}
