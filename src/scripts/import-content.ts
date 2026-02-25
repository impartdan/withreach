import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.resolve(__dirname, '../../data')
const TEMP_DIR = path.resolve(__dirname, '../../temp-import-media')
const OLD_SITE_BASE = 'https://www.withreach.com'

// ---------------------------------------------------------------------------
// Types matching the scraped JSON shape
// ---------------------------------------------------------------------------

interface ImageRef {
  url: string
  alt?: string
  filename?: string
}

interface ScrapedBlock {
  blockType: string
  text?: string
  level?: string
  style?: string
  items?: string[]
  quote?: string
  citation?: string
  heading?: string
  stats?: Array<{ value?: string; description?: string; title?: string }>
  imageUrl?: string
  imageAlt?: string
  videoType?: string
  youtubeUrl?: string
  title?: string
  description?: string
}

interface ScrapedContent {
  type: string
  blocks: ScrapedBlock[]
}

interface ScrapedMeta {
  title?: string
  description?: string
  ogImageUrl?: string | null
}

interface ScrapedPost {
  type: 'post'
  title: string
  slug: string
  excerpt?: string | null
  publishedAt?: string | null
  heroImage?: ImageRef | null
  authors?: string[]
  categories?: string[]
  content: ScrapedContent
  meta?: ScrapedMeta
  sourceUrl?: string
}

interface ScrapedCaseStudy {
  type: 'case-study'
  title: string
  slug: string
  companyName?: string | null
  excerpt?: string | null
  publishedAt?: string | null
  heroImage?: ImageRef | null
  companyLogo?: ImageRef | null
  pdfUrl?: string | null
  highlights?: Array<{ label: string; value: string }>
  categories?: string[]
  caseStudyCategories?: string[]
  content: ScrapedContent
  meta?: ScrapedMeta
  sourceUrl?: string
}

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
// Utilities
// ---------------------------------------------------------------------------

function generateId(): string {
  return crypto.randomBytes(12).toString('hex')
}

/** Resolve relative image URLs against the old site base. */
function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return OLD_SITE_BASE + (url.startsWith('/') ? url : '/' + url)
}

/** Derive a safe filename from a URL. */
function urlToFilename(url: string): string {
  try {
    const parsed = new URL(url)
    const base = path.basename(parsed.pathname)
    return base || `image-${generateId()}`
  } catch {
    return `image-${generateId()}`
  }
}

/** Download a remote URL to a temp file, returning the local path. */
async function downloadToTemp(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`)

  const contentType = res.headers.get('content-type') || ''
  const buffer = Buffer.from(await res.arrayBuffer())

  let filename = urlToFilename(url)
  // Ensure the extension matches the content-type
  if (!path.extname(filename)) {
    if (contentType.includes('svg')) filename += '.svg'
    else if (contentType.includes('webp')) filename += '.webp'
    else if (contentType.includes('jpeg') || contentType.includes('jpg')) filename += '.jpg'
    else if (contentType.includes('png')) filename += '.png'
    else if (contentType.includes('gif')) filename += '.gif'
    else filename += '.bin'
  }

  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true })
  const filePath = path.join(TEMP_DIR, filename)
  fs.writeFileSync(filePath, buffer)
  return filePath
}

/**
 * Download a remote image, upload it to Payload media, and return the media ID.
 * Results are cached so each URL is only downloaded/uploaded once.
 */
async function ensureMedia(
  rawUrl: string | null | undefined,
  alt: string,
  payload: Awaited<ReturnType<typeof getPayload>>,
  cache: Map<string, number>,
): Promise<number | null> {
  const url = resolveImageUrl(rawUrl)
  if (!url) return null
  if (cache.has(url)) return cache.get(url)!

  let filePath: string | null = null
  try {
    filePath = await downloadToTemp(url)

    const media = await payload.create({
      collection: 'media',
      data: { alt: alt || '' },
      filePath,
    })

    cache.set(url, media.id as number)
    stats.media.uploaded++
    console.log(`  [media] uploaded: ${path.basename(filePath)} (id: ${media.id})`)
    return media.id as number
  } catch (err: unknown) {
    console.warn(`  [media] FAILED to upload ${url}: ${err instanceof Error ? err.message : String(err)}`)
    stats.media.failed++
    return null
  } finally {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }
}

// ---------------------------------------------------------------------------
// Lexical AST helpers
// ---------------------------------------------------------------------------

function makeTextNode(text: string) {
  return { type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }
}

function makeParagraphNode(text: string) {
  return {
    type: 'paragraph',
    children: [makeTextNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function makeHeadingNode(tag: string, text: string) {
  return {
    type: 'heading',
    tag,
    children: [makeTextNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function makeListNode(listType: 'bullet' | 'number', items: string[]) {
  return {
    type: 'list',
    listType,
    start: 1,
    tag: listType === 'bullet' ? 'ul' : 'ol',
    children: items.map((item, i) => ({
      type: 'listitem',
      value: i + 1,
      children: [makeTextNode(item)],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function makeBlockNode(fields: Record<string, unknown>) {
  return {
    type: 'block',
    fields: { id: generateId(), ...fields },
    format: '',
    version: 2,
  }
}

/** Build a minimal Lexical document from an array of plain-text paragraphs. */
function makeSimpleLexical(paragraphs: string[]) {
  const children =
    paragraphs.filter(Boolean).length > 0
      ? paragraphs.filter(Boolean).map(makeParagraphNode)
      : [makeParagraphNode('')]

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Convert the scraped flat block array into a Payload Lexical document.
 * Downloads any inline images as media before building block nodes.
 */
async function convertBlocksToLexical(
  blocks: ScrapedBlock[],
  mediaCache: Map<string, number>,
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<object> {
  const children: unknown[] = []

  for (const block of blocks) {
    try {
      switch (block.blockType) {
        case 'paragraph': {
          if (!block.text) break
          // A single paragraph may contain \n-separated lines — emit each as its own node.
          const lines = block.text.split('\n').filter((l) => l.trim())
          for (const line of lines) {
            children.push(makeParagraphNode(line.trim()))
          }
          break
        }

        case 'heading': {
          if (!block.text) break
          const tag = ['h1', 'h2', 'h3', 'h4'].includes(block.level || '') ? block.level! : 'h2'
          children.push(makeHeadingNode(tag, block.text))
          break
        }

        case 'list': {
          if (!block.items?.length) break
          const listType = block.style === 'ordered' ? 'number' : 'bullet'
          children.push(makeListNode(listType, block.items))
          break
        }

        case 'blockquote': {
          children.push(
            makeBlockNode({
              blockType: 'blockquote',
              quote: block.quote || '',
              citation: block.citation || '',
            }),
          )
          break
        }

        case 'statsBlock': {
          // `value` is a required field in StatsBlock — fall back to description if empty
          const validStats = (block.stats || []).map((s) => ({
            value: s.value || s.description || '-',
            description: s.description || '',
          }))
          if (validStats.length > 0) {
            children.push(
              makeBlockNode({
                blockType: 'statsBlock',
                heading: block.heading || '',
                stats: validStats,
              }),
            )
          }
          break
        }

        case 'imageBlock': {
          const imageId = await ensureMedia(block.imageUrl, block.imageAlt || '', payload, mediaCache)
          if (imageId) {
            children.push(
              makeBlockNode({
                blockType: 'imageBlock',
                image: imageId,
                maxWidth: 'max-w-4xl',
                alignment: 'center',
              }),
            )
          }
          break
        }

        case 'videoEmbed': {
          children.push(
            makeBlockNode({
              blockType: 'videoEmbed',
              title: block.title || '',
              description: block.description || '',
              videoType: block.videoType || 'youtube',
              youtubeUrl: block.youtubeUrl || '',
            }),
          )
          break
        }

        case 'conclusion': {
          // The scraped `text` field becomes the conclusion's nested richText `content`.
          // Split on double-newlines to produce separate paragraphs.
          const textParts = (block.text || '').split('\n\n').filter(Boolean)
          const conclusionContent = makeSimpleLexical(textParts)

          children.push(
            makeBlockNode({
              blockType: 'conclusion',
              heading: block.heading || 'Conclusion',
              content: conclusionContent,
              stats: (block.stats || []).map((s) => ({
                title: s.title || '',
                description: s.description || '',
              })),
            }),
          )
          break
        }

        default:
          console.warn(`  [lexical] Unknown blockType: ${block.blockType} — skipping`)
      }
    } catch (err: unknown) {
      console.warn(`  [lexical] Failed to convert block (${block.blockType}): ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // Lexical requires at least one child node
  if (children.length === 0) children.push(makeParagraphNode(''))

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
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

  // Read all individual files
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

      // Prefer the one with more content; if equal, prefer the clean slug
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
    console.warn(`  [category] FAILED for "${title}": ${err instanceof Error ? err.message : String(err)}`)
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
  // Idempotency check
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
    // Resolve categories
    const categoryIds = (
      await Promise.all(
        (post.categories || []).map((c) => ensureCategory(c, categoryCache, payload)),
      )
    ).filter((id): id is number => id !== null)

    // Resolve hero image
    const heroImageId = await ensureMedia(
      post.heroImage?.url,
      post.heroImage?.alt || post.title,
      payload,
      mediaCache,
    )

    // Resolve OG image (may be the same as hero — cache deduplicates)
    const ogImageId = await ensureMedia(
      post.meta?.ogImageUrl,
      `${post.title} OG`,
      payload,
      mediaCache,
    )

    // Convert content blocks — use excerpt as fallback if no blocks
    const blocks = post.content?.blocks || []
    const content =
      blocks.length > 0
        ? await convertBlocksToLexical(blocks, mediaCache, payload)
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
    console.error(`  [post] FAILED: ${post.slug}: ${err instanceof Error ? err.message : String(err)}`)
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
    )

    const companyLogoId = await ensureMedia(
      cs.companyLogo?.url,
      cs.companyLogo?.alt || `${cs.companyName || cs.title} logo`,
      payload,
      mediaCache,
    )

    const ogImageId = await ensureMedia(
      cs.meta?.ogImageUrl,
      `${cs.title} OG`,
      payload,
      mediaCache,
    )

    const csBlocks = cs.content?.blocks || []
    const content =
      csBlocks.length > 0
        ? await convertBlocksToLexical(csBlocks, mediaCache, payload)
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
    console.error(`  [case-study] FAILED: ${cs.slug}: ${err instanceof Error ? err.message : String(err)}`)
    stats.caseStudies.failed++
  }
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== Content Import ===\n')

  const payload = await getPayload({ config })

  // Shared caches so images and categories are only resolved once
  const categoryCache = new Map<string, number>()
  const mediaCache = new Map<string, number>()

  // --- Posts ---
  console.log('Loading posts...')
  const posts = loadPosts()
  console.log(`Found ${posts.length} posts.\n`)

  console.log('Importing posts...')
  for (const post of posts) {
    await importPost(post, payload, categoryCache, mediaCache)
  }

  // --- Case Studies ---
  console.log('\nLoading case studies...')
  const caseStudies = loadCaseStudies()
  console.log(`Found ${caseStudies.length} case studies (after deduplication).\n`)

  console.log('Importing case studies...')
  for (const cs of caseStudies) {
    await importCaseStudy(cs, payload, categoryCache, mediaCache)
  }

  // Cleanup temp directory if it exists
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true })
  }

  // --- Summary ---
  console.log('\n=== Import Summary ===')
  console.log(`Categories:   created=${stats.categories.created}  skipped=${stats.categories.skipped}`)
  console.log(`Media:        uploaded=${stats.media.uploaded}  skipped=${stats.media.skipped}  failed=${stats.media.failed}`)
  console.log(`Posts:        created=${stats.posts.created}  skipped=${stats.posts.skipped}  failed=${stats.posts.failed}`)
  console.log(`Case Studies: created=${stats.caseStudies.created}  skipped=${stats.caseStudies.skipped}  failed=${stats.caseStudies.failed}`)

  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
