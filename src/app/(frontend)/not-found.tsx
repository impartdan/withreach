'use client'

import { Link } from 'next-view-transitions'
import React from 'react'

import { Button } from '@/components/ui/button'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export default function NotFound() {
  return (
    <div className="relative min-h-screen header-offset flex items-center justify-center">
      <div className="container z-10 relative flex items-center justify-center">
        <RevealOnScroll variant="slideUp">
          <div className="max-w-2xl text-center space-y-8">
            <p className="type-eyebrow  uppercase tracking-widest">404 Error</p>
            <h1 className="type-display-lg text-balance">
              We could not find the page that you&apos;re looking for.
            </h1>
            <p className="type-intro  max-w-md mx-auto text-balance">
              Let&apos;s get you back on course.
            </p>
            <div className="flex justify-center">
              <Button asChild variant="default" size="lg">
                <Link href="/">Visit our Homepage</Link>
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}
