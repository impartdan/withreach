import React from 'react'
import Link from 'next/link'

type Props = {
  className?: string
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={className}
      style={{
        padding: '17px 30px',
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <Link href="/">
        <img alt="Withreach" src="/logo.svg" width={110} height={20} decoding="async" />
      </Link>
    </div>
  )
}
