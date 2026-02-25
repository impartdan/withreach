import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { Link } from 'next-view-transitions'
import RichText from '@/components/RichText'

import type { CaseStudy, CaseStudyCategory, Category, CaseStudiesSetting } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RelatedCaseStudies } from './RelatedCaseStudies'

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

  const payload = await getPayload({ config: configPromise })
  const caseStudiesSettings = (await payload.findGlobal({
    slug: 'case-studies-settings',
  })) as CaseStudiesSetting

  const relatedCaseStudies = await getRelatedCaseStudies({
    caseStudy,
    limit: 3,
  })

  const cta = caseStudiesSettings?.caseStudyCta

  return (
    <article>
      <PageClient id={String(caseStudy.id)} collection="case-studies" />

      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <CaseStudyHero caseStudy={caseStudy} />

      <div className="bg-white">
        <div className="container py-20">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            {/* Left Column - Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-10 max-w-[720px]">
              <CaseStudyHighlights caseStudy={caseStudy} />

              <RichText data={caseStudy.content} enableGutter={false} />

              <Link
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
              </Link>
            </div>

            {/* Right Column - Sticky CTA */}
            {cta && (cta.title || cta.description || cta.primaryLink?.label) && (
              <div className="hidden lg:block w-[430px] shrink-0">
                <div className="sticky top-32">
                  <CaseStudyCta cta={cta} caseStudy={caseStudy} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      {cta && (cta.title || cta.description || cta.primaryLink?.label) && (
        <div className="lg:hidden bg-white pb-16">
          <div className="container">
            <CaseStudyCta cta={cta} caseStudy={caseStudy} />
          </div>
        </div>
      )}

      {relatedCaseStudies.length > 0 && <RelatedCaseStudies caseStudies={relatedCaseStudies} />}
    </article>
  )
}

function CaseStudyHighlights({ caseStudy }: { caseStudy: CaseStudy }) {
  const { highlights } = caseStudy

  if (!highlights || highlights.length === 0) return null

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-6">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex flex-col gap-2">
          <p className="text-base font-sans font-medium text-brand-black leading-relaxed">
            {highlight.label}
          </p>
          <p className="text-[22px] font-sans text-brand-black leading-snug">{highlight.value}</p>
        </div>
      ))}
    </div>
  )
}

function CaseStudyCta({
  cta,
  caseStudy,
}: {
  cta: NonNullable<CaseStudiesSetting['caseStudyCta']>
  caseStudy: CaseStudy
}) {
  const pdf = caseStudy.pdf && typeof caseStudy.pdf === 'object' ? caseStudy.pdf : null
  const pdfUrl = pdf?.url

  return (
    <div className="border border-brand-gray-light backdrop-blur-[187px] rounded-2xl py-[72px] px-[50px] flex flex-col items-center gap-8 text-center overflow-hidden">
      <div className="flex flex-col gap-6">
        {cta.title && (
          <p className="text-[40px] font-sans text-brand-black leading-[1.1]">{cta.title}</p>
        )}
        {cta.description && (
          <p className="text-lg font-sans font-medium text-brand-black leading-relaxed">
            {cta.description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center">
        {cta.primaryLink && cta.primaryLink.label && (
          <CMSLink {...cta.primaryLink} appearance="default" />
        )}
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center justify-center px-6 py-2 rounded-[6px] border border-brand-black text-brand-black font-sans font-semibold text-base leading-snug hover:bg-brand-black hover:text-white transition-colors"
          >
            Download case study
          </a>
        )}
      </div>
    </div>
  )
}

function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const { categories, caseStudyCategories, excerpt, heroImage, title, companyName, companyLogo } =
    caseStudy

  const resolvedCategories = [
    ...(caseStudyCategories
      ?.filter((c): c is CaseStudyCategory => typeof c === 'object' && c !== null)
      .map((c) => c.title) ?? []),
    ...(categories
      ?.filter((c): c is Category => typeof c === 'object' && c !== null)
      .map((c) => c.title) ?? []),
  ]

  const logo = companyLogo && typeof companyLogo === 'object' ? companyLogo : null

  return (
    <section className="bg-brand-off-white w-full">
      <div className="container header-offset pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[78px] items-start">
          <div className="flex flex-col gap-10 flex-1 min-w-0 max-w-[661px]">
            <Link
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
            </Link>

            <div className="flex flex-col gap-6">
              <h1 className="type-display-lg text-brand-black">{title}</h1>

              {excerpt && (
                <p className="text-lg font-sans font-medium text-brand-black leading-relaxed">
                  {excerpt}
                </p>
              )}
            </div>

            {resolvedCategories.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {resolvedCategories.map((catTitle, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-5 py-2.5 rounded-[6px] bg-brand-black text-white type-eyebrow"
                  >
                    {catTitle ?? 'Untitled'}
                  </span>
                ))}
              </div>
            )}
          </div>

          {heroImage && typeof heroImage === 'object' && (
            <div className="w-full lg:w-[430px] shrink-0">
              <div className="relative w-full aspect-[430/290] rounded-lg overflow-hidden">
                <Media fill priority imgClassName="object-cover" resource={heroImage} />
                <div className="absolute inset-0 bg-black/30 rounded-lg" />
                {logo && (
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <Media
                      resource={logo}
                      className="max-w-[60%] max-h-[40%] object-contain relative z-10"
                      htmlElement={null}
                    />
                  </div>
                )}
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

async function getRelatedCaseStudies({
  caseStudy,
  limit,
}: {
  caseStudy: CaseStudy
  limit: number
}) {
  const payload = await getPayload({ config: configPromise })

  const relatedIds =
    caseStudy.relatedCaseStudies?.map((r) => (typeof r === 'object' ? r.id : r)).filter(Boolean) ??
    []

  if (relatedIds.length > 0) {
    const result = await payload.find({
      collection: 'case-studies',
      draft: false,
      limit,
      overrideAccess: false,
      where: {
        id: {
          in: relatedIds,
        },
      },
    })
    return result.docs
  }

  const result = await payload.find({
    collection: 'case-studies',
    draft: false,
    limit: 20,
    overrideAccess: false,
    pagination: false,
    where: {
      id: {
        not_equals: caseStudy.id,
      },
    },
  })

  const shuffled = result.docs.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, limit)
}
