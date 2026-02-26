import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FIGMA_IMAGES = {
  productScreenshot: 'https://www.figma.com/api/mcp/asset/29be2a2a-9814-4de2-ab77-155e3a2fd668',
  person1: 'https://www.figma.com/api/mcp/asset/4e9cacd1-ea48-4f12-9d0a-ba79afb49401',
  person2: 'https://www.figma.com/api/mcp/asset/0206dca5-bf2f-4a24-97bb-b86fd0193d7f',
  person3: 'https://www.figma.com/api/mcp/asset/2b5288f2-fc59-47a2-98ae-d46ab6529cba',
  person4: 'https://www.figma.com/api/mcp/asset/f51cdedb-5e77-4e39-b60e-d58ee0a8597b',
}

async function downloadImage(url: string, filename: string, tmpDir: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type') || 'image/png'
  let ext = 'png'
  if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = 'jpg'
  else if (contentType.includes('webp')) ext = 'webp'

  const buffer = Buffer.from(await response.arrayBuffer())
  const filePath = path.join(tmpDir, `${filename}.${ext}`)
  fs.writeFileSync(filePath, buffer)
  return filePath
}

function makeParagraph(text: string, format: number | string = '') {
  return {
    type: 'paragraph',
    format,
    indent: 0,
    version: 1,
    children: [
      {
        mode: 'normal',
        text,
        type: 'text',
        style: '',
        detail: 0,
        format: 0,
        version: 1,
      },
    ],
    direction: null,
  }
}

function makeRichText(...children: object[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      children,
      direction: null,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  const tmpDir = path.join(__dirname, '../../temp-company-assets')
  fs.mkdirSync(tmpDir, { recursive: true })

  console.log('Starting company page update...')
  try {
    console.log('Downloading Figma images...')

    const mediaIds: Record<string, number> = {}

    for (const [key, url] of Object.entries(FIGMA_IMAGES)) {
      try {
        console.log(`  Downloading ${key}...`)
        const filePath = await downloadImage(url, `company-${key}`, tmpDir)

        const media = await payload.create({
          collection: 'media',
          data: {
            alt: key === 'productScreenshot' ? 'Merchant of record platform screenshot' : `Team member photo`,
          },
          filePath,
        })
        mediaIds[key] = media.id
        console.log(`  ✓ Uploaded ${key} → media ID ${media.id}`)

        fs.unlinkSync(filePath)
      } catch (err) {
        console.warn(`  ✗ Failed to upload ${key}:`, err)
      }
    }

    console.log('\nUpdating company page (ID: 11)...')

    const heroRichText = makeRichText(
      {
        tag: 'h1',
        type: 'heading',
        format: 'center',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: 'Conquer global markets with Reach + Recurly',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
        direction: null,
      },
      {
        type: 'typographyStyle',
        typographyStyle: 'type-intro',
        format: 'center',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text: 'Reach acts as your Merchant of Record, handling global tax, compliance, and localized payments. Recurly provides robust subscription orchestration. Focus on growth; we handle the details.',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
        direction: null,
      },
    )

    const imageLeftItems = [
      {
        title: 'Registration and filing',
        description: makeRichText(
          makeParagraph(
            'Reach registers in every required jurisdiction and handles all tax filings through our own local entities. And when you sell through Reach, we take on full responsibility for those end-customer transactions.',
          ),
        ),
      },
      {
        title: 'Collection at checkout',
        description: makeRichText(
          makeParagraph(
            'Tax is calculated in real time based on product type and jurisdiction-specific rules.',
          ),
        ),
      },
      {
        title: 'Remittance and reporting',
        description: makeRichText(
          makeParagraph(
            'We remit taxes to the correct authorities and provide consolidated reporting for your records.',
          ),
        ),
      },
      {
        title: 'Audit defense',
        description: makeRichText(
          makeParagraph(
            "If a tax authority audits an end-shopper transaction, the merchant of record model assigns liability to Reach—not your business—and we'll help you address any inquiries.",
          ),
        ),
      },
    ]

    const ctaContent = makeRichText(
      makeParagraph(
        "Book a call to see your fastest path to efficient international sales. We'll walk through exactly how to add X+ countries to your checkout without rebuilding anything.",
        'center',
      ),
    )

    // Build people array cycling through 4 person photos
    const placeholderPeople = [
      { name: 'First Lastname', title: 'Title / Team', photoKey: 'person1' },
      { name: 'First Lastname', title: 'Title / Team', photoKey: 'person2' },
      { name: 'First Lastname', title: 'Title / Team', photoKey: 'person3' },
      { name: 'First Lastname', title: 'Title / Team', photoKey: 'person4' },
      { name: 'First Lastname', title: 'Title / Team', photoKey: 'person1' },
      { name: 'First Lastname', title: 'Title / Team', photoKey: 'person2' },
      { name: 'First Lastname', title: 'Title / Team', photoKey: 'person3' },
      { name: 'First Lastname', title: 'Title / Team', photoKey: 'person4' },
    ]

    const people = placeholderPeople
      .map((p) => {
        const photoId = mediaIds[p.photoKey]
        if (!photoId) return null
        return {
          name: p.name,
          title: p.title,
          photo: photoId,
          linkedinUrl: null,
        }
      })
      .filter(Boolean)

    const layoutBlocks: object[] = []

    // ImageLeftTextRight
    const productScreenshotId = mediaIds['productScreenshot']
    if (productScreenshotId) {
      layoutBlocks.push(      {
        blockType: 'imageLeftTextRight',
        heading: 'What we handle as merchant of record',
        images: [{ image: productScreenshotId }],
        items: imageLeftItems,
      })
    } else {
      console.warn('Skipping ImageLeftTextRight: no product screenshot available')
    }

    // PeopleIndex (only add if we have photos)
    if (people.length > 0) {
      layoutBlocks.push(      {
        blockType: 'peopleIndex',
        heading: 'Our team',
        people,
      })
    } else {
      console.warn('Skipping PeopleIndex: no person photos available')
    }

    // CtaLarge
    layoutBlocks.push({
      blockType: 'ctaLarge',
      label: 'Connect with us',
      heading: 'More efficient global sales in just a few weeks',
      content: ctaContent,
      links: [
        {
          link: {
            type: 'reference',
            newTab: false,
            reference: {
              relationTo: 'pages',
              value: 2,
            },
            url: null,
            label: 'Get in touch',
            appearance: 'default',
          },
        },
      ],
    })

    await payload.update({
      collection: 'pages',
      id: 11,
      data: {
        hero: [
          {
            blockType: 'textHero',
            richText: heroRichText,
            links: [
              {
                link: {
                  type: 'reference',
                  newTab: false,
                  reference: {
                    relationTo: 'pages',
                    value: 2,
                  },
                  url: null,
                  label: 'Get in touch',
                  appearance: 'default',
                },
              },
            ],
          },
        ],
        layout: layoutBlocks,
        _status: 'published',
      },
    })

    console.log('\n✓ Company page updated successfully!')
    console.log('View at: http://localhost:3000/company')
    console.log('Edit at: http://localhost:3000/admin/collections/pages/11')
  } catch (err) {
    console.error('\n✗ Error updating company page:')
    console.error(err)
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true })
    process.exit(1)
  }

  // Clean up tmp dir
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
  process.exit(0)
}

main().catch((err) => {
  console.error('Unhandled error:', err)
  process.exit(1)
})
