import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

// Partner URL slugs from withreach.com/partners
const partnerUrls = [
  { url: '/partners/shopify', slug: 'shopify' },
  { url: '/partners/recurly', slug: 'recurly' },
  { url: '/partners/magento', slug: 'adobe-commerce' }, // Adobe Commerce uses /magento URL
  { url: '/partners/aria', slug: 'aria' },
  { url: '/partners/bigcommerce', slug: 'bigcommerce' },
  { url: '/partners/bridgerpay', slug: 'bridgerpay' },
  { url: '/partners/cellpoint-digital', slug: 'cellpoint-digital' },
  { url: '/partners/chargebee', slug: 'chargebee' },
  { url: '/partners/commerce_tools', slug: 'commercetools' },
  { url: '/partners/evergent', slug: 'evergent' },
  { url: '/partners/naviga', slug: 'naviga' },
  { url: '/partners/netsuite', slug: 'netsuite' },
  { url: '/partners/prestashop', slug: 'prestashop' },
  { url: '/partners/primer', slug: 'primer' },
  { url: '/partners/quickbooks', slug: 'quickbooks' },
  { url: '/partners/sap', slug: 'sap' },
  { url: '/partners/sap_hybris', slug: 'sap-hybris-commerce-cloud' },
  { url: '/partners/salesforce', slug: 'salesforce-commerce-cloud' },
  { url: '/partners/spreedly', slug: 'spreedly' },
  { url: '/partners/subscribe_pro', slug: 'subscribe-pro' },
  { url: '/partners/vindicia', slug: 'vindicia' },
  { url: '/partners/woocommerce', slug: 'woocommerce' },
  { url: '/partners/xero', slug: 'xero' },
  { url: '/partners/zuora', slug: 'zuora' },
]

interface PartnerContent {
  body: string[]
  features: string[]
}

// This data will be populated by manually visiting each page with the browser MCP
// and extracting the content
const partnerData: Record<string, PartnerContent> = {}

function createLexicalBody(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text,
            format: 0,
            mode: 'normal',
            style: '',
            detail: 0,
            version: 1,
          },
        ],
        format: '',
        indent: 0,
        direction: 'ltr',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function createLexicalFeatures(features: string[]) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'list',
          listType: 'bullet',
          start: 1,
          tag: 'ul',
          children: features.map((text, index) => ({
            type: 'listitem',
            value: index + 1,
            children: [
              {
                type: 'text',
                text,
                format: 0,
                mode: 'normal',
                style: '',
                detail: 0,
                version: 1,
              },
            ],
            format: '',
            indent: 0,
            direction: 'ltr',
            version: 1,
          })),
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

async function updatePartner(slug: string, content: PartnerContent) {
  const payload = await getPayload({ config })

  try {
    // Find integration by slug
    const integrations = await payload.find({
      collection: 'integrations',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (integrations.docs.length === 0) {
      console.log(`⚠️  Integration not found: ${slug}`)
      return false
    }

    const integration = integrations.docs[0]

    // Prepare update data
    const updateData: any = {}

    if (content.body.length > 0) {
      updateData.body = createLexicalBody(content.body)
    }

    if (content.features.length > 0) {
      updateData.features = createLexicalFeatures(content.features)
    }

    // Update if we have data
    if (Object.keys(updateData).length > 0) {
      await payload.update({
        collection: 'integrations',
        id: integration.id,
        data: updateData,
      })

      console.log(
        `✅ Updated ${integration.title} (${content.body.length} paragraphs, ${content.features.length} features)`,
      )
      return true
    }

    return false
  } catch (error) {
    console.log(`❌ Error updating ${slug}:`, error)
    return false
  }
}

// Export for use in interactive script
export { partnerUrls, updatePartner, partnerData }

// If run directly, show instructions
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('This script is meant to be used with the interactive browser scraping.')
  console.log('Please use the AI assistant to run the scraping process.')
  process.exit(0)
}
