import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

interface PageSeoData {
  slug: string
  title: string
  description: string
}

const PAGE_SEO_UPDATES: PageSeoData[] = [
  {
    slug: 'home',
    title: 'Reach | The modular merchant of record for global sellers',
    description:
      'Modular merchant of record infrastructure for global commerce. Cross-border payments, tax, and compliance integrated with Shopify, Stripe, Adyen and more.',
  },
  {
    slug: 'merchant-of-record',
    title: 'Merchant of record | Global payments, tax, compliance | Reach',
    description:
      'Modular merchant of record infrastructure with integrations for Shopify, Stripe, Adyen, and more. Handle payments, tax, and fraud without platform migration.',
  },
  {
    slug: 'global-tax-compliance',
    title: 'Global tax compliance | merchant of record | Reach',
    description:
      "Automated global tax compliance built in Reach's merchant of record infrastructure. We handle sales tax, VAT, GST filing, and remittance in 200+ markets.",
  },
  {
    slug: 'payments-local-acquiring',
    title: 'Global payments & local acquiring | merchant of record | Reach',
    description:
      'Increases approval rates, reduces cross-border friction, and ensure local compliance. Support local payment methods, 100+ currencies. Over $5 billion processed.',
  },
  {
    slug: 'fraud-protection',
    title: 'Fraud protection & chargeback liability | merchant of record | Reach',
    description:
      'Reach assumes fraud liability for cross-border transactions. We prevent disputes before they happen keeping losses and chargebacks off your books.',
  },
  {
    slug: 'for-retail',
    title: 'Merchant of record for retail | Shopify, BigCommerce & more | Reach',
    description:
      'Merchant of record for retail brands. Sell globally with automated tax, payments and compliance. Integrates with Shopify, BigCommerce, WooCommerce, and more.',
  },
  {
    slug: 'for-digital-saas',
    title: 'Merchant of record for SaaS & digital | Recurly & more | Reach',
    description:
      'Merchant of record for SaaS and digital businesses. Handle VAT, subscription billing, and tax compliance with Stripe, Zuora, Recurly, or Chargebee integration.',
  },
  {
    slug: 'integrations',
    title: 'Merchant of record integrations | Shopify, Recurly, & more | Reach',
    description:
      'Pre-built merchant of record integrations for Shopify, Adyen, Stripe, Recurly, Chargebee and more. Global tax, payments & compliance without custom development.',
  },
  {
    slug: 'partner-with-reach',
    title: 'Partner with us & grow revenue | Merchant of record | Reach',
    description:
      'Add merchant of record to what you offer. Reach handles tax, fraud, and cross-border compliance, you earn revenue without building new infrastructure.',
  },
  {
    slug: 'technology-partners',
    title: 'Integrate & extend your reach | Merchant of record | Reach',
    description:
      "Integrate Reach's merchant of record infrastructure into your platform. Give merchants global compliance, local acquiring, and fraud coverage.",
  },
  {
    slug: 'referral-partners',
    title: 'Refer to us & earn revenue | Merchant of record | Reach',
    description:
      'Refer merchants to Reach and earn commission on every one that goes live. We handle onboarding, compliance, and support. You make the introduction.',
  },
  {
    slug: 'news-insights',
    title: 'Cross-border insights | Merchant of record | Reach',
    description:
      'The latest on merchant of record, cross-border payments, and global commerce from Reach - news, updates, and perspectives from our team.',
  },
  {
    slug: 'case-studies',
    title: 'See how brands succeed globally | Merchant of record | Reach',
    description:
      "See how brands use Reach's merchant of record infrastructure to expand cross-border, reduce compliance risk, and grow revenue without switching platforms.",
  },
  {
    slug: 'shopper-support',
    title: 'Merchant of record | Shopper support | Reach',
    description:
      'Questions about an order placed through a Reach merchant? We help with refunds, billing, and payment issues. Contact our support team directly.',
  },
  {
    slug: 'supplier-support',
    title: 'Merchant of record | Supplier support | Reach',
    description:
      'Get help with your Reach integration, account setup, or platform questions. Access technical docs, API support, and account management—all in one place.',
  },
  {
    slug: 'company',
    title: 'The Team Behind Merchant of Record Infrastructure | Reach',
    description:
      'Reach was built to make global commerce simpler for merchants. Meet the team behind the merchant of record infrastructure powering cross-border growth.',
  },
]

async function main() {
  const payload = await getPayload({ config })

  console.log(`Updating SEO meta for ${PAGE_SEO_UPDATES.length} pages...\n`)

  let successCount = 0
  let failCount = 0

  for (const { slug, title, description } of PAGE_SEO_UPDATES) {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      console.warn(`  ✗ Page not found: slug="${slug}"`)
      failCount++
      continue
    }

    const page = result.docs[0]

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        meta: {
          title,
          description,
        },
      },
    })

    console.log(`  ✓ Updated "${slug}" (ID: ${page.id})`)
    console.log(`      Title: ${title}`)
    console.log(`      Desc:  ${description}\n`)
    successCount++
  }

  console.log(`\nDone. ${successCount} updated, ${failCount} not found.`)
  process.exit(0)
}

main().catch((err) => {
  console.error('Unhandled error:', err)
  process.exit(1)
})
