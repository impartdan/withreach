import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const partners = [
  {
    name: 'Shopify',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FShopify_logo_2018.svg&w=2560&q=70',
  },
  {
    name: 'Adobe Commerce',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2F1280px-Magento.svg%255B1%255D.png&w=2560&q=70',
  },
  {
    name: 'BigCommerce',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fbc-logo-dark%255B1%255D.svg&w=2560&q=70',
  },
  {
    name: 'CommerceTools',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=%2Fimages%2Fpartner-icons%2Fcommercetools-logo-2024.svg&w=2560&q=70',
  },
  {
    name: 'Prestashop',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2F1200px-Prestashop.svg%255B1%255D.png&w=2560&q=70',
  },
  {
    name: 'SAP Hybris Commerce Cloud',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fsap-logo-svg.svg&w=2560&q=70',
  },
  {
    name: 'Salesforce Commerce Cloud',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Flogo-salesforce%255B1%255D.svg&w=2560&q=70',
  },
  {
    name: 'WooCommerce',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Flogo-woocommerce%255B1%255D.svg&w=2560&q=70',
  },
  {
    name: 'Recurly',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=%2Fimages%2Fpartner-icons%2Frecurly.svg&w=2560&q=70',
  },
  {
    name: 'Aria',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2Faria-systems-logo.png&w=2560&q=70',
  },
  {
    name: 'Chargebee',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fchargebee.svg&w=2560&q=70',
  },
  {
    name: 'Evergent',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2FAF1QipMLU1uPaSM38voLbNZzgEeV1ARISD3H_vCBlLjr=s680-w680-h510.png&w=2560&q=70',
  },
  {
    name: 'Naviga',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2FNaviga_Logo_Dark_Horizontal.svg&w=2560&q=70',
  },
  {
    name: 'Subscribe Pro',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2Fsubscribe_pro_logo_4c.svg&w=2560&q=70',
  },
  {
    name: 'Vindicia',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2F86e727107ca6c58388f0a3d90677faa193f3caac.png&w=2560&q=70',
  },
  {
    name: 'Zuora',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2Fzuora-wordmark.svg&w=2560&q=70',
  },
  {
    name: 'Bridgerpay',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Fcdn.marketing.withreach.com%2Fhubfs%2Fbridgerpay-logo.png&w=2560&q=70',
  },
  {
    name: 'CellPoint Digital',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fcpd_logo-tagline_low_rgb%255B1%255D.png&w=2560&q=70',
  },
  {
    name: 'Primer',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Fcdn.marketing.withreach.com%2Fhubfs%2FImported%2520sitepage%2520images%2Fprimer-io-logo-vector.png&w=2560&q=70',
  },
  {
    name: 'Spreedly',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2F6261b09eab2dfced097800a2_Logo.svg&w=2560&q=70',
  },
  {
    name: 'Netsuite',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2FOracle-NetSuite-Logo.svg&w=2560&q=70',
  },
  {
    name: 'Quickbooks',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2Fintuit-quickbooks1505.jpg&w=2560&q=70',
  },
  {
    name: 'SAP',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fsap-logo-svg.svg&w=2560&q=70',
  },
  {
    name: 'Xero',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2FXero_software_logo.svg&w=2560&q=70',
  },
]

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

async function downloadImage(url: string, filename: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type') || 'image/png'
  let ext = 'png'
  if (contentType.includes('jpeg') || contentType.includes('jpg')) {
    ext = 'jpg'
  } else if (contentType.includes('svg')) {
    ext = 'svg'
  } else if (contentType.includes('webp')) {
    ext = 'webp'
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const tempDir = path.join(__dirname, '../../temp-logos')

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  const filePath = path.join(tempDir, `${filename}.${ext}`)
  fs.writeFileSync(filePath, buffer)

  return filePath
}

async function uploadLogos() {
  const payload = await getPayload({ config })

  console.log('Uploading integration logos...\n')

  for (const partner of partners) {
    const slug = toSlug(partner.name)

    // Find the integration
    const existing = await payload.find({
      collection: 'integrations',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      console.log(`Integration "${partner.name}" not found, skipping...`)
      continue
    }

    const integration = existing.docs[0]

    // Skip if logo already exists
    if (integration.logo) {
      console.log(`Integration "${partner.name}" already has a logo, skipping...`)
      continue
    }

    try {
      console.log(`Downloading logo for ${partner.name}...`)
      const filePath = await downloadImage(partner.logoUrl, slug)

      console.log(`Uploading logo for ${partner.name}...`)
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `${partner.name} logo`,
        },
        filePath,
      })

      // Update the integration with the logo
      await payload.update({
        collection: 'integrations',
        id: integration.id,
        data: {
          logo: media.id,
        },
      })

      console.log(`✓ Uploaded logo for ${partner.name}`)

      // Clean up temp file
      fs.unlinkSync(filePath)
    } catch (error) {
      console.error(`✗ Failed to upload logo for ${partner.name}:`, error)
    }
  }

  // Clean up temp directory
  const tempDir = path.join(__dirname, '../../temp-logos')
  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir, { recursive: true })
  }

  console.log('\nLogo upload complete!')
  process.exit(0)
}

uploadLogos().catch((err) => {
  console.error('Error uploading logos:', err)
  process.exit(1)
})
