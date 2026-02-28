'use client'
import React from 'react'
import type { PeopleIndexBlock as PeopleIndexBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const PeopleIndexBlock: React.FC<PeopleIndexBlockProps> = ({ heading, people }) => {
  return (
    <div className="container">
      {heading && (
        <RevealOnScroll variant="fadeIn">
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-light font-mix tracking-[-0.02em] leading-[1.1] text-brand-black text-center mb-10 md:mb-14">
            {heading}
          </h2>
        </RevealOnScroll>
      )}

      {Array.isArray(people) && people.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map((person, index) => (
            <RevealOnScroll
              key={index}
              variant="slideUp"
              delay={index * 0.05}
              className="bg-brand-off-white rounded-[8px] p-5 md:p-6 flex flex-col gap-4"
            >
              {person.photo && typeof person.photo !== 'string' && (
                <div className="aspect-square rounded-lg overflow-hidden">
                  <Media resource={person.photo} imgClassName="object-cover w-full h-full" />
                </div>
              )}
              <div>
                {person.name && (
                  <p className="text-base font-semibold text-brand-black">{person.name}</p>
                )}
                {person.title && <p className="text-sm text-brand-black/60">{person.title}</p>}
              </div>
              {person.linkedinUrl && (
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-black hover:text-brand-black/70 transition-colors"
                  aria-label={`${person.name} on LinkedIn`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  )
}
