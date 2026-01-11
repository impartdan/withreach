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
      {/* eslint-disable @next/next/no-img-element */}
      <Link href="/">
        <LogoComponent style={{ width: '110px', height: '20px' }} />
      </Link>
    </div>
  )
}
