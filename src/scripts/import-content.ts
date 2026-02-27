import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  type ScrapedPost,
  type ScrapedCaseStudy,
  ensureMedia,
  convertBlocksToLexical,
  makeSimpleLexical,
  cleanupTempDir,
} from './lib/lexical-helpers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.resolve(__dirname, '../../data')

// ---------------------------------------------------------------------------
// Counters for summary output
// ---------------------------------------------------------------------------

const stats = {
  categories: { created: 0, skipped: 0 },
  media: { uploaded: 0, skipped: 0, failed: 0 },
  posts: { created: 0, skipped: 0, failed: 0 },
  caseStudies: { created: 0, skipped: 0, failed: 0 },
}

// ---------------------------------------------------------------------------
// Data loading
// ---------------------------------------------------------------------------

function loadPosts(): ScrapedPost[] {
  const indexPath = path.join(DATA_DIR, 'posts', 'posts.json')
  if (!fs.existsSync(indexPath)) throw new Error(`Missing: ${indexPath}`)
  const raw = JSON.parse(fs.readFileSync(indexPath, 'utf-8')) as ScrapedPost[]
  return raw
}

function loadCaseStudies(): ScrapedCaseStudy[] {
  const dir = path.join(DATA_DIR, 'case-studies')
  if (!fs.existsSync(dir)) throw new Error(`Missing: ${dir}`)

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json') && f !== 'case-studies.json')

  const all: ScrapedCaseStudy[] = files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
    return JSON.parse(raw) as ScrapedCaseStudy
  })

  // Deduplicate by companyName (case-insensitive): keep the version with the
  // most content blocks, falling back to the clean (non-prefixed) slug.
  const byCompany = new Map<string, ScrapedCaseStudy>()
  for (const cs of all) {
    const key = (cs.companyName || cs.title || cs.slug).toLowerCase().trim()
    const existing = byCompany.get(key)
    if (!existing) {
      byCompany.set(key, cs)
    } else {
      const existingBlocks = existing.content?.blocks?.length ?? 0
      const currentBlocks = cs.content?.blocks?.length ?? 0
      const existingIsClean = !existing.slug.startsWith('case-study-')
      const currentIsClean = !cs.slug.startsWith('case-study-')

      if (
        currentBlocks > existingBlocks ||
        (currentBlocks === existingBlocks && currentIsClean && !existingIsClean)
      ) {
        byCompany.set(key, cs)
      }
    }
  }

  return Array.from(byCompany.values())
}

// ---------------------------------------------------------------------------
// Category management
// ---------------------------------------------------------------------------

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

async function ensureCategory(
  title: string,
  categoryCache: Map<string, number>,
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<number | null> {
  if (categoryCache.has(title)) return categoryCache.get(title)!

  const slug = toSlug(title)
  try {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const id = existing.docs[0].id as number
      categoryCache.set(title, id)
      stats.categories.skipped++
      return id
    }

    const created = await payload.create({
      collection: 'categories',
      data: { title, slug },
    })

    const id = created.id as number
    categoryCache.set(title, id)
    stats.categories.created++
    console.log(`  [category] created: ${title}`)
    return id
  } catch (err: unknown) {
    console.warn(
      `  [category] FAILED for "${title}": ${err instanceof Error ? err.message : String(err)}`,
    )
    return null
  }
}

// ---------------------------------------------------------------------------
// Post import
// ---------------------------------------------------------------------------

async function importPost(
  post: ScrapedPost,
  payload: Awaited<ReturnType<typeof getPayload>>,
  categoryCache: Map<string, number>,
  mediaCache: Map<string, number>,
): Promise<void> {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: post.slug } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`  [post] SKIP (exists): ${post.slug}`)
    stats.posts.skipped++
    return
  }

  try {
    const categoryIds = (
      await Promise.all(
        (post.categories || []).map((c) => ensureCategory(c, categoryCache, payload)),
      )
    ).filter((id): id is number => id !== null)

    const heroImageId = await ensureMedia(
      post.heroImage?.url,
      post.heroImage?.alt || post.title,
      payload,
      mediaCache,
      stats.media,
    )

    const ogImageId = await ensureMedia(
      post.meta?.ogImageUrl,
      `${post.title} OG`,
      payload,
      mediaCache,
      stats.media,
    )

    const blocks = post.content?.blocks || []
    const content =
      blocks.length > 0
        ? await convertBlocksToLexical(blocks, mediaCache, payload, stats.media)
        : makeSimpleLexical([post.excerpt || post.title])

    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || undefined,
        publishedAt: post.publishedAt || undefined,
        heroImage: heroImageId ?? undefined,
        categories: categoryIds.length ? categoryIds : undefined,
        content,
        meta: {
          title: post.meta?.title || post.title,
          description: post.meta?.description || post.excerpt || undefined,
          image: ogImageId ?? undefined,
        },
        _status: 'published',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      context: { disableRevalidate: true },
    })

    console.log(`  [post] created: ${post.slug}`)
    stats.posts.created++
  } catch (err: unknown) {
    console.error(
      `  [post] FAILED: ${post.slug}: ${err instanceof Error ? err.message : String(err)}`,
    )
    stats.posts.failed++
  }
}

// ---------------------------------------------------------------------------
// Case study import
// ---------------------------------------------------------------------------

async function importCaseStudy(
  cs: ScrapedCaseStudy,
  payload: Awaited<ReturnType<typeof getPayload>>,
  categoryCache: Map<string, number>,
  mediaCache: Map<string, number>,
): Promise<void> {
  const existing = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: cs.slug } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`  [case-study] SKIP (exists): ${cs.slug}`)
    stats.caseStudies.skipped++
    return
  }

  try {
    const heroImageId = await ensureMedia(
      cs.heroImage?.url,
      cs.heroImage?.alt || cs.title,
      payload,
      mediaCache,
      stats.media,
    )

    const companyLogoId = await ensureMedia(
      cs.companyLogo?.url,
      cs.companyLogo?.alt || `${cs.companyName || cs.title} logo`,
      payload,
      mediaCache,
      stats.media,
    )

    const ogImageId = await ensureMedia(
      cs.meta?.ogImageUrl,
      `${cs.title} OG`,
      payload,
      mediaCache,
      stats.media,
    )

    const csBlocks = cs.content?.blocks || []
    const content =
      csBlocks.length > 0
        ? await convertBlocksToLexical(csBlocks, mediaCache, payload, stats.media)
        : makeSimpleLexical([cs.excerpt || cs.title])

    await payload.create({
      collection: 'case-studies',
      data: {
        title: cs.title,
        slug: cs.slug,
        companyName: cs.companyName || cs.title,
        excerpt: cs.excerpt || undefined,
        publishedAt: cs.publishedAt || undefined,
        heroImage: heroImageId ?? undefined,
        companyLogo: companyLogoId ?? undefined,
        highlights: cs.highlights?.length ? cs.highlights : undefined,
        content,
        meta: {
          title: cs.meta?.title || cs.title,
          description: cs.meta?.description || cs.excerpt || undefined,
          image: ogImageId ?? undefined,
        },
        _status: 'published',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      context: { disableRevalidate: true },
    })

    console.log(`  [case-study] created: ${cs.slug}`)
    stats.caseStudies.created++
  } catch (err: unknown) {
    console.error(
      `  [case-study] FAILED: ${cs.slug}: ${err instanceof Error ? err.message : String(err)}`,
    )
    stats.caseStudies.failed++
  }
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== Content Import ===\n')

  const payload = await getPayload({ config })

  const categoryCache = new Map<string, number>()
  const mediaCache = new Map<string, number>()

  console.log('Loading posts...')
  const posts = loadPosts()
  console.log(`Found ${posts.length} posts.\n`)

  console.log('Importing posts...')
  for (const post of posts) {
    await importPost(post, payload, categoryCache, mediaCache)
  }

  console.log('\nLoading case studies...')
  const caseStudies = loadCaseStudies()
  console.log(`Found ${caseStudies.length} case studies (after deduplication).\n`)

  console.log('Importing case studies...')
  for (const cs of caseStudies) {
    await importCaseStudy(cs, payload, categoryCache, mediaCache)
  }

  cleanupTempDir()

  console.log('\n=== Import Summary ===')
  console.log(
    `Categories:   created=${stats.categories.created}  skipped=${stats.categories.skipped}`,
  )
  console.log(
    `Media:        uploaded=${stats.media.uploaded}  skipped=${stats.media.skipped}  failed=${stats.media.failed}`,
  )
  console.log(
    `Posts:        created=${stats.posts.created}  skipped=${stats.posts.skipped}  failed=${stats.posts.failed}`,
  )
  console.log(
    `Case Studies: created=${stats.caseStudies.created}  skipped=${stats.caseStudies.skipped}  failed=${stats.caseStudies.failed}`,
  )

  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
