import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound, redirect } from 'next/navigation'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Integration } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { BackButton } from '@/components/ui/back-button'
import { Tag } from '@/components/Tag'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const integrations = await payload.find({
    collection: 'integrations',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return integrations.docs.map(({ slug }) => ({
    slug,
  }))
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

interface LexicalNode {
  type?: string
  children?: LexicalNode[]
  text?: string
}

interface RichTextData {
  root?: LexicalNode
}

// Helper function to extract feature list items from richText
function extractFeatures(richTextData: RichTextData): string[] {
  if (!richTextData?.root?.children) return []

  const features: string[] = []

  const traverse = (node: LexicalNode) => {
    if (node.type === 'listitem' && node.children) {
      // Extract text from list item
      const text = node.children
        .map((child: LexicalNode) => {
          if (child.type === 'text') return child.text
          if (child.children) {
            return child.children.map((c: LexicalNode) => c.text || '').join('')
          }
          return ''
        })
        .join('')
        .trim()
      if (text) features.push(text)
    }

    if (node.children) {
      node.children.forEach((child: LexicalNode) => traverse(child))
    }
  }

  traverse(richTextData.root)
  return features
}

export default async function IntegrationPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const integration = await queryIntegrationBySlug({ slug })

  if (!integration) {
    return notFound()
  }

  const featuredIds = await getFeaturedIntegrationIds()

  if (!featuredIds.includes(integration.id)) {
    redirect('/partners')
  }

  const logo = typeof integration.logo === 'object' ? integration.logo : null
  const icon = typeof integration.icon === 'object' ? integration.icon : null

  // Extract features from richText
  const featuresList = integration.features ? extractFeatures(integration.features) : []

  return (
    <article className="pb-24 header-offset">
      {/* Main Content Section */}
      <div className="container mx-auto px-4 max-w-7xl py-16 md:py-24">
        {/* Icon/Logo - Small size */}
        {(icon || logo) && (
          <div className="mb-8">
            {(icon || logo)!.mimeType === 'image/svg+xml' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={getMediaUrl((icon || logo)!.url, (icon || logo)!.updatedAt)}
                alt={(icon || logo)!.alt || integration.title}
                className="h-16 w-auto object-contain"
              />
            ) : (
              <Media resource={(icon || logo)!} imgClassName="h-16 w-auto object-contain" />
            )}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Logo, Title, Description */}
          <div>
            {/* Title */}
            <h1 className="type-display-lg [&_span]:block [&_span]:text-brand-olive mb-6">
              {integration.title}
            </h1>

            {/* Description - Can be multiple paragraphs */}
            <div className="space-y-4 type-body [&>p]:mb-0">
              {integration.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Body Content if available */}
            {integration.body && (
              <div className="mt-8">
                <RichText data={integration.body} enableGutter={false} enableProse={true} />
              </div>
            )}

            <BackButton href="/integrations" className="mt-8">
              Back to Integrations
            </BackButton>
          </div>

          {/* Right Column - Features */}
          {featuresList.length > 0 && (
            <div>
              <h2 className="type-eyebrow [&_span]:block [&_span]:text-brand-olive mb-8">
                Features
              </h2>
              <div className="flex flex-wrap gap-4">
                {featuresList.map((feature, index) => (
                  <Tag key={index} label={feature} variant="primary" />
                ))}
              </div>
            </div>
          )}

          {/* If no feature list, show features richText in full */}
          {!featuresList.length && integration.features && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Features</h2>
              <RichText data={integration.features} enableGutter={false} enableProse={false} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const integration = await queryIntegrationBySlug({ slug })

  if (!integration) {
    return {}
  }

  return generateMeta({ doc: integration })
}

const queryIntegrationBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'integrations',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

async function getFeaturedIntegrationIds(): Promise<(string | number)[]> {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
    pagination: false,
    select: {
      layout: true,
    },
  })

  const featuredIds = new Set<string | number>()

  for (const page of pages.docs) {
    if (page.layout) {
      for (const block of page.layout) {
        if (block.blockType === 'integrations' && block.selectedIntegrations) {
          const selectedIds = block.selectedIntegrations
            .map((integration: number | Integration) => {
              if (typeof integration === 'object' && integration !== null) {
                return integration.id
              }
              return integration
            })
            .filter(Boolean)

          selectedIds.forEach((id: string | number) => featuredIds.add(id))
        }
      }
    }
  }

  return Array.from(featuredIds)
}
