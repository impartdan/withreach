import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { BackButton } from '@/components/ui/back-button'

import type { NewsSetting, Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { CMSLink } from '@/components/Link'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RelatedPostsSidebar } from './RelatedPostsSidebar'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/resources/news/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  const payload = await getPayload({ config: configPromise })
  const newsSettings = (await payload.findGlobal({
    slug: 'news-settings',
  })) as NewsSetting

  const relatedPosts = await getRelatedPosts({ post, limit: 3 })

  const cta = newsSettings?.postCta

  return (
    <article>
      <PageClient id={String(post.id)} collection="posts" />

      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="bg-white">
        <div className="container py-10 md:py-20">
          <div className="flex flex-col lg:flex-row gap-20 justify-between max-w-6xl mx-auto">
            {/* Left Column - Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-10 max-w-[720px]">
              <RichText data={post.content} enableGutter={false} />

              <BackButton href="/resources/news">Back to News and Insights</BackButton>

              {cta && (cta.title || cta.description || cta.link?.label) && (
                <PostCta cta={cta} />
              )}
            </div>

            {/* Right Column - Sticky Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="hidden lg:block w-[505px] shrink-0">
                <div className="sticky top-32">
                  <RelatedPostsSidebar posts={relatedPosts} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function PostCta({ cta }: { cta: NonNullable<NewsSetting['postCta']> }) {
  return (
    <div className="border border-brand-gray-light backdrop-blur-[187px] rounded-2xl py-[72px] px-[50px] flex flex-col items-center gap-8 text-center overflow-hidden">
      <div className="flex flex-col gap-6">
        {cta.title && (
          <p className="text-[40px] font-sans text-brand-black leading-[1.1]">{cta.title}</p>
        )}
        {cta.description && (
          <p className="text-[22px] font-sans text-brand-black leading-snug">{cta.description}</p>
        )}
      </div>
      {cta.link?.label && (
        <CMSLink
          type={cta.link.type}
          newTab={cta.link.newTab}
          reference={cta.link.reference ?? undefined}
          url={cta.link.url}
          label={cta.link.label}
          appearance="default"
        />
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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

async function getRelatedPosts({ post, limit }: { post: Post; limit: number }) {
  const payload = await getPayload({ config: configPromise })

  const relatedIds =
    post.relatedPosts?.map((r) => (typeof r === 'object' ? r.id : r)).filter(Boolean) ?? []

  if (relatedIds.length > 0) {
    const result = await payload.find({
      collection: 'posts',
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
    collection: 'posts',
    draft: false,
    limit: 20,
    overrideAccess: false,
    pagination: false,
    where: {
      id: {
        not_equals: post.id,
      },
    },
  })

  const shuffled = result.docs.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, limit)
}
