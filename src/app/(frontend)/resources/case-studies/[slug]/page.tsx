import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { CaseStudy } from '@/payload-types'

import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const caseStudies = await payload.find({
    collection: 'case-studies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return caseStudies.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CaseStudyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/resources/case-studies/' + decodedSlug
  const caseStudy = await queryCaseStudyBySlug({ slug: decodedSlug })

  if (!caseStudy) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16">
      <PageClient id={String(caseStudy.id)} collection="case-studies" />

      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <CaseStudyHero caseStudy={caseStudy} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={caseStudy.content} enableGutter={false} />
        </div>
      </div>
    </article>
  )
}

function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const { categories, excerpt, heroImage, publishedAt, title, companyName } = caseStudy

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <section className="bg-brand-off-white w-full">
      <div className="container header-offset pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="flex flex-col gap-10 flex-1 min-w-0">
            <a
              href="/resources/case-studies"
              className="inline-flex items-center gap-2 text-brand-black text-base font-sans font-semibold hover:opacity-70 transition-opacity"
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-90"
              >
                <path
                  d="M1 1L7 6L1 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Case Studies
            </a>

            <div className="flex flex-col gap-6">
              {companyName && (
                <div className="flex items-center gap-2 type-eyebrow text-brand-black">
                  <span>{companyName}</span>
                  <span className="text-brand-gray-med">&times;</span>
                  <span>Reach</span>
                </div>
              )}
              <h1 className="type-display-lg text-brand-black">{title}</h1>

              <div className="flex flex-col gap-2">
                {formattedDate && (
                  <p className="text-lg font-sans font-medium text-brand-black">{formattedDate}</p>
                )}
                {excerpt && (
                  <p className="text-lg font-sans font-medium text-brand-black leading-relaxed">
                    {excerpt}
                  </p>
                )}
              </div>
            </div>

            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => {
                  if (typeof category !== 'object' || !category) return null
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-brand-gray-light text-brand-black text-sm font-sans font-medium"
                    >
                      {category.title ?? 'Untitled'}
                    </span>
                  )
                })}
              </div>
            )}
          </div>

          {heroImage && typeof heroImage !== 'string' && typeof heroImage === 'object' && (
            <div className="w-full lg:w-[40%] lg:max-w-[420px] shrink-0">
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden">
                <Media
                  fill
                  priority
                  imgClassName="object-cover"
                  resource={heroImage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const caseStudy = await queryCaseStudyBySlug({ slug: decodedSlug })

  return generateMeta({ doc: caseStudy })
}

const queryCaseStudyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
