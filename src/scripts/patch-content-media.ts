/**
 * patch-content-media.ts
 *
 * Patches existing Payload posts and case-studies whose JSON source data
 * contains imageBlock or videoEmbed entries that were not present when the
 * entry was originally imported.
 *
 * The script auto-detects which entries need updating (any JSON file that
 * contains at least one imageBlock or videoEmbed block), re-generates the
 * full Lexical content for those entries, and calls payload.update() to
 * write the new content — leaving all other fields untouched.
 *
 * Run with:
 *   pnpm patch:content-media
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  type ScrapedPost,
  type ScrapedCaseStudy,
  type ScrapedBlock,
  convertBlocksToLexical,
  cleanupTempDir,
} from './lib/lexical-helpers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.resolve(__dirname, '../../data')

// ---------------------------------------------------------------------------
// Counters
// ---------------------------------------------------------------------------

const stats = {
  media: { uploaded: 0, skipped: 0, failed: 0 },
  posts: { updated: 0, skipped: 0, failed: 0, notFound: 0 },
  caseStudies: { updated: 0, skipped: 0, failed: 0, notFound: 0 },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hasMediaBlocks(blocks: ScrapedBlock[]): boolean {
  return blocks.some((b) => b.blockType === 'imageBlock' || b.blockType === 'videoEmbed')
}

// ---------------------------------------------------------------------------
// Data discovery: find all posts / case-studies with media blocks
// ---------------------------------------------------------------------------

function findPostsWithMedia(): ScrapedPost[] {
  const indexPath = path.join(DATA_DIR, 'posts', 'posts.json')
  if (!fs.existsSync(indexPath)) {
    console.warn(`[posts] Index file not found: ${indexPath}`)
    return []
  }
  const all = JSON.parse(fs.readFileSync(indexPath, 'utf-8')) as ScrapedPost[]
  return all.filter((p) => hasMediaBlocks(p.content?.blocks ?? []))
}

function findCaseStudiesWithMedia(): ScrapedCaseStudy[] {
  const dir = path.join(DATA_DIR, 'case-studies')
  if (!fs.existsSync(dir)) {
    console.warn(`[case-studies] Directory not found: ${dir}`)
    return []
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json') && f !== 'case-studies.json')

  const results: ScrapedCaseStudy[] = []
  for (const f of files) {
    const cs = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')) as ScrapedCaseStudy
    if (hasMediaBlocks(cs.content?.blocks ?? [])) {
      results.push(cs)
    }
  }

  // Deduplicate by slug — if both "case-study-foo" and "foo" have media blocks,
  // prefer the one with more blocks (same logic as the main import script).
  const bySlugBase = new Map<string, ScrapedCaseStudy>()
  for (const cs of results) {
    const key = (cs.companyName || cs.title || cs.slug).toLowerCase().trim()
    const existing = bySlugBase.get(key)
    if (!existing) {
      bySlugBase.set(key, cs)
    } else {
      const existingBlocks = existing.content?.blocks?.length ?? 0
      const currentBlocks = cs.content?.blocks?.length ?? 0
      if (currentBlocks > existingBlocks) bySlugBase.set(key, cs)
    }
  }

  return Array.from(bySlugBase.values())
}

// ---------------------------------------------------------------------------
// Patch a post
// ---------------------------------------------------------------------------

async function patchPost(
  post: ScrapedPost,
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaCache: Map<string, number>,
): Promise<void> {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: post.slug } },
    limit: 1,
  })

  if (existing.docs.length === 0) {
    console.warn(`  [post] NOT FOUND in DB: ${post.slug} — run the import script first`)
    stats.posts.notFound++
    return
  }

  const docId = existing.docs[0].id as number

  try {
    const content = await convertBlocksToLexical(
      post.content.blocks,
      mediaCache,
      payload,
      stats.media,
    )

    await payload.update({
      collection: 'posts',
      id: docId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { content } as any,
      context: { disableRevalidate: true },
    })

    console.log(`  [post] updated: ${post.slug} (id: ${docId})`)
    stats.posts.updated++
  } catch (err: unknown) {
    console.error(
      `  [post] FAILED: ${post.slug}: ${err instanceof Error ? err.message : String(err)}`,
    )
    stats.posts.failed++
  }
}

// ---------------------------------------------------------------------------
// Patch a case study
// ---------------------------------------------------------------------------

async function patchCaseStudy(
  cs: ScrapedCaseStudy,
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaCache: Map<string, number>,
): Promise<void> {
  // The DB entry may have been imported under either slug variant
  // (e.g. "aussiebum" or "case-study-aussiebum"). Try both.
  const slugsToTry = Array.from(
    new Set([cs.slug, cs.slug.replace(/^case-study-/, ''), `case-study-${cs.slug}`]),
  )

  let docId: number | null = null
  let matchedSlug: string | null = null

  for (const slug of slugsToTry) {
    const found = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (found.docs.length > 0) {
      docId = found.docs[0].id as number
      matchedSlug = slug
      break
    }
  }

  if (docId === null) {
    console.warn(
      `  [case-study] NOT FOUND in DB (tried: ${slugsToTry.join(', ')}) — run the import script first`,
    )
    stats.caseStudies.notFound++
    return
  }

  try {
    const content = await convertBlocksToLexical(
      cs.content.blocks,
      mediaCache,
      payload,
      stats.media,
    )

    await payload.update({
      collection: 'case-studies',
      id: docId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { content } as any,
      context: { disableRevalidate: true },
    })

    console.log(`  [case-study] updated: ${matchedSlug} (id: ${docId})`)
    stats.caseStudies.updated++
  } catch (err: unknown) {
    console.error(
      `  [case-study] FAILED: ${cs.slug}: ${err instanceof Error ? err.message : String(err)}`,
    )
    stats.caseStudies.failed++
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== Patch Content Media ===\n')

  const payload = await getPayload({ config })
  const mediaCache = new Map<string, number>()

  // --- Posts ---
  const postsToUpdate = findPostsWithMedia()
  console.log(`Found ${postsToUpdate.length} post(s) with imageBlock/videoEmbed to patch:`)
  for (const p of postsToUpdate) {
    console.log(`  - ${p.slug}`)
  }
  console.log()

  for (const post of postsToUpdate) {
    await patchPost(post, payload, mediaCache)
  }

  // --- Case Studies ---
  const casesToUpdate = findCaseStudiesWithMedia()
  console.log(`\nFound ${casesToUpdate.length} case study/studies with imageBlock/videoEmbed to patch:`)
  for (const cs of casesToUpdate) {
    console.log(`  - ${cs.slug}`)
  }
  console.log()

  for (const cs of casesToUpdate) {
    await patchCaseStudy(cs, payload, mediaCache)
  }

  cleanupTempDir()

  console.log('\n=== Patch Summary ===')
  console.log(
    `Media:        uploaded=${stats.media.uploaded}  skipped=${stats.media.skipped}  failed=${stats.media.failed}`,
  )
  console.log(
    `Posts:        updated=${stats.posts.updated}  skipped=${stats.posts.skipped}  notFound=${stats.posts.notFound}  failed=${stats.posts.failed}`,
  )
  console.log(
    `Case Studies: updated=${stats.caseStudies.updated}  skipped=${stats.caseStudies.skipped}  notFound=${stats.caseStudies.notFound}  failed=${stats.caseStudies.failed}`,
  )

  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
