import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { getPayload } from 'payload'

const TEMP_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../temp-import-media')
const OLD_SITE_BASE = 'https://www.withreach.com'

// ---------------------------------------------------------------------------
// Types matching the scraped JSON shape
// ---------------------------------------------------------------------------

export interface ImageRef {
  url: string
  alt?: string
  filename?: string
}

export interface ScrapedBlock {
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

export interface ScrapedContent {
  type: string
  blocks: ScrapedBlock[]
}

export interface ScrapedMeta {
  title?: string
  description?: string
  ogImageUrl?: string | null
}

export interface ScrapedPost {
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

export interface ScrapedCaseStudy {
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
// Utilities
// ---------------------------------------------------------------------------

export function generateId(): string {
  return crypto.randomBytes(12).toString('hex')
}

/** Resolve relative image URLs against the old site base. */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return OLD_SITE_BASE + (url.startsWith('/') ? url : '/' + url)
}

/** Derive a safe filename from a URL. */
export function urlToFilename(url: string): string {
  try {
    const parsed = new URL(url)
    const base = path.basename(parsed.pathname)
    return base || `image-${generateId()}`
  } catch {
    return `image-${generateId()}`
  }
}

/** Download a remote URL to a temp file, returning the local path. */
export async function downloadToTemp(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`)

  const contentType = res.headers.get('content-type') || ''
  const buffer = Buffer.from(await res.arrayBuffer())

  let filename = urlToFilename(url)
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
export async function ensureMedia(
  rawUrl: string | null | undefined,
  alt: string,
  payload: Awaited<ReturnType<typeof getPayload>>,
  cache: Map<string, number>,
  mediaStats?: { uploaded: number; skipped: number; failed: number },
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
    if (mediaStats) mediaStats.uploaded++
    console.log(`  [media] uploaded: ${path.basename(filePath)} (id: ${media.id})`)
    return media.id as number
  } catch (err: unknown) {
    console.warn(
      `  [media] FAILED to upload ${url}: ${err instanceof Error ? err.message : String(err)}`,
    )
    if (mediaStats) mediaStats.failed++
    return null
  } finally {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }
}

export function cleanupTempDir() {
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true })
}

// ---------------------------------------------------------------------------
// Lexical AST helpers
// ---------------------------------------------------------------------------

export function makeTextNode(text: string) {
  return { type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }
}

export function makeParagraphNode(text: string) {
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

export function makeHeadingNode(tag: string, text: string) {
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

export function makeListNode(listType: 'bullet' | 'number', items: string[]) {
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

export function makeBlockNode(fields: Record<string, unknown>) {
  return {
    type: 'block',
    fields: { id: generateId(), ...fields },
    format: '',
    version: 2,
  }
}

/** Build a minimal Lexical document from an array of plain-text paragraphs. */
export function makeSimpleLexical(paragraphs: string[]) {
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
export async function convertBlocksToLexical(
  blocks: ScrapedBlock[],
  mediaCache: Map<string, number>,
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaStats?: { uploaded: number; skipped: number; failed: number },
): Promise<object> {
  const children: unknown[] = []

  for (const block of blocks) {
    try {
      switch (block.blockType) {
        case 'paragraph': {
          if (!block.text) break
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
          const imageId = await ensureMedia(
            block.imageUrl,
            block.imageAlt || '',
            payload,
            mediaCache,
            mediaStats,
          )
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
      console.warn(
        `  [lexical] Failed to convert block (${block.blockType}): ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

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
