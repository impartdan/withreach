import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const categories = [
  'Ecommerce Platform',
  'Billing & Subscriptions',
  'Payment Orchestration Platform',
  'Accounting Services',
]

const partners = [
  {
    name: 'Shopify',
    description:
      'Global e-commerce solution that allows merchants to build a full-service e-commerce platform for their business.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FShopify_logo_2018.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/shopify',
    category: 'Ecommerce Platform',
  },
  {
    name: 'Adobe Commerce',
    description:
      'Empowering thousands of brands with the best ecommerce platforms and flexible cloud solutions to rapidly grow.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2F1280px-Magento.svg%255B1%255D.png&w=2560&q=70',
    link: 'https://www.withreach.com/partners/magento',
    category: 'Ecommerce Platform',
  },
  {
    name: 'BigCommerce',
    description:
      'SaaS Ecommerce platform for online retailers, from startups to mid-market and large enterprises.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fbc-logo-dark%255B1%255D.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/bigcommerce',
    category: 'Ecommerce Platform',
  },
  {
    name: 'CommerceTools',
    description:
      'Cloud-based headless commerce platform that provides APIs to power e-commerce sales and similar functions for large businesses.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=%2Fimages%2Fpartner-icons%2Fcommercetools-logo-2024.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/commerce_tools',
    category: 'Ecommerce Platform',
  },
  {
    name: 'Prestashop',
    description:
      'Freemium, open-source ecommerce platform and CMS built on the Symfony PHP framework.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2F1200px-Prestashop.svg%255B1%255D.png&w=2560&q=70',
    link: 'https://www.withreach.com/partners/prestashop',
    category: 'Ecommerce Platform',
  },
  {
    name: 'SAP Hybris Commerce Cloud',
    description:
      'Enterprise-grade digital commerce and marketing platform to fuel innovation and drive profitable growth.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fsap-logo-svg.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/sap_hybris',
    category: 'Ecommerce Platform',
  },
  {
    name: 'Salesforce Commerce Cloud',
    description:
      'The industry-leading, cloud-based commerce solution for transforming shopping experiences across digital channels.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Flogo-salesforce%255B1%255D.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/salesforce',
    category: 'Ecommerce Platform',
  },
  {
    name: 'WooCommerce',
    description: 'Ecommerce and payments platform for the popular Wordpress CMS.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Flogo-woocommerce%255B1%255D.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/woocommerce',
    category: 'Ecommerce Platform',
  },
  {
    name: 'Recurly',
    description:
      'Recurly provides a flexible subscription billing management platform to optimize recurring billing and revenue.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=%2Fimages%2Fpartner-icons%2Frecurly.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/recurly',
    category: 'Billing & Subscriptions',
  },
  {
    name: 'Aria',
    description:
      'SaaS billing automation platform designed to handle complex usage and subscriptions business models for any industry.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2Faria-systems-logo.png&w=2560&q=70',
    link: 'https://www.withreach.com/partners/aria',
    category: 'Billing & Subscriptions',
  },
  {
    name: 'Chargebee',
    description:
      'Enables subscription businesses to capture, retain and maximize revenue opportunities through automated recurring billing, subscription management, and revenue analytics.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fchargebee.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/chargebee',
    category: 'Billing & Subscriptions',
  },
  {
    name: 'Evergent',
    description:
      'Market-leading Agile Revenue and Customer Management platform enabling subscription based companies to reduce time to market.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2FAF1QipMLU1uPaSM38voLbNZzgEeV1ARISD3H_vCBlLjr=s680-w680-h510.png&w=2560&q=70',
    link: 'https://www.withreach.com/partners/evergent',
    category: 'Billing & Subscriptions',
  },
  {
    name: 'Naviga',
    description: 'Billing and subscription automation for the media and entertainment industries.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2FNaviga_Logo_Dark_Horizontal.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/naviga',
    category: 'Billing & Subscriptions',
  },
  {
    name: 'Subscribe Pro',
    description: 'Enabling subscriptions and recurring billing in an existing ecommerce platform.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2Fsubscribe_pro_logo_4c.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/subscribe_pro',
    category: 'Billing & Subscriptions',
  },
  {
    name: 'Vindicia',
    description:
      'Complete billing and subscriptions management platform for enhancing customer relationships.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2F86e727107ca6c58388f0a3d90677faa193f3caac.png&w=2560&q=70',
    link: 'https://www.withreach.com/partners/vindicia',
    category: 'Billing & Subscriptions',
  },
  {
    name: 'Zuora',
    description:
      'Handles the complexities of a recurring revenue business – whether monetized through subscriptions, consumption, or pricing strategies.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2Fzuora-wordmark.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/zuora',
    category: 'Billing & Subscriptions',
  },
  {
    name: 'Bridgerpay',
    description:
      'Bridgerpay provides merchants access to payment providers through dynamic checkouts and a unified admin to fully manage and optimize personalized payment flows.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Fcdn.marketing.withreach.com%2Fhubfs%2Fbridgerpay-logo.png&w=2560&q=70',
    link: 'https://www.withreach.com/partners/bridgerpay',
    category: 'Payment Orchestration Platform',
  },
  {
    name: 'CellPoint Digital',
    description:
      'Payment orchestrations platform that empowers merchants to optimize their payment experience by maximizing approvals and lowering costs.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fcpd_logo-tagline_low_rgb%255B1%255D.png&w=2560&q=70',
    link: 'https://www.withreach.com/partners/cellpoint-digital',
    category: 'Payment Orchestration Platform',
  },
  {
    name: 'Primer',
    description:
      'A no-code automation payment orchestration platform that connects payment options and commerce services to customers worldwide.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Fcdn.marketing.withreach.com%2Fhubfs%2FImported%2520sitepage%2520images%2Fprimer-io-logo-vector.png&w=2560&q=70',
    link: 'https://www.withreach.com/partners/primer',
    category: 'Payment Orchestration Platform',
  },
  {
    name: 'Spreedly',
    description:
      'Spreedly connects merchants to a massive network of payment providers through a single API.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2F6261b09eab2dfced097800a2_Logo.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/spreedly',
    category: 'Payment Orchestration Platform',
  },
  {
    name: 'Netsuite',
    description:
      'Unified business management suite encompassing ERP/Financials, CRM and ecommerce.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2FOracle-NetSuite-Logo.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/netsuite',
    category: 'Accounting Services',
  },
  {
    name: 'Quickbooks',
    description: 'Accounting & financial management suite for small businesses.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2Fintuit-quickbooks1505.jpg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/quickbooks',
    category: 'Accounting Services',
  },
  {
    name: 'SAP',
    description: 'Award-winning ERP and financial management software.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2Fsap-logo-svg.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/sap',
    category: 'Accounting Services',
  },
  {
    name: 'Xero',
    description:
      'Accounting software and tools for small businesses, accountants, and bookkeepers.',
    logoUrl:
      'https://www.withreach.com/_vercel/image?url=https:%2F%2Frch-cms-content.s3.us-west-2.amazonaws.com%2Fhubfs%2FImported%2520images%2FXero_software_logo.svg&w=2560&q=70',
    link: 'https://www.withreach.com/partners/xero',
    category: 'Accounting Services',
  },
]

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding integration categories...')

  // Create a map to store category IDs
  const categoryMap: Record<string, number> = {}

  // Seed categories
  for (const categoryTitle of categories) {
    const slug = toSlug(categoryTitle)

    // Check if category already exists
    const existing = await payload.find({
      collection: 'integration-categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`Category "${categoryTitle}" already exists, skipping...`)
      categoryMap[categoryTitle] = existing.docs[0].id
      continue
    }

    const created = await payload.create({
      collection: 'integration-categories',
      data: {
        title: categoryTitle,
        slug,
      },
    })

    categoryMap[categoryTitle] = created.id
    console.log(`Created category: ${categoryTitle}`)
  }

  console.log('\nSeeding integrations...')

  // Seed integrations
  for (const partner of partners) {
    const slug = toSlug(partner.name)

    // Check if integration already exists
    const existing = await payload.find({
      collection: 'integrations',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`Integration "${partner.name}" already exists, skipping...`)
      continue
    }

    const categoryId = categoryMap[partner.category]

    await payload.create({
      collection: 'integrations',
      data: {
        title: partner.name,
        description: partner.description,
        category: categoryId,
        slug,
      },
    })

    console.log(`Created integration: ${partner.name}`)
  }

  console.log('\nSeeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error seeding data:', err)
  process.exit(1)
})
