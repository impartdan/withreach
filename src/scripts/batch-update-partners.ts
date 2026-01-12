import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

// Manually extracted content from partner pages
// Format: { slug, body: [], features: [] }
const partnersContent = {
  shopify: {
    body: [
      'Shopify is an industry-leading commerce platform built to offer brands everything they need to start, grow and manage their online business. From no-code customizations for creating unique shopping experiences to shipping management, Shopify provides a full-service solution for brands to enhance their business.',
      "Shopify is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Payment Processing',
      'Multi Store',
      'Sales Tax Management',
      'Inventory Management',
      'Shopping Cart',
    ],
  },
  bigcommerce: {
    body: [
      'BigCommerce is an industry-leading ecommerce platform designed for enterprise-level businesses down to small companies and startups. BigCommerce provides a highly flexible ecommerce solution for brands, with tools for everything from store creation to search engine and marketing optimization.',
      "BigCommerce is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Headless Commerce',
      'Page Builder',
      'Multi-storefront',
      'Payment Processing',
      'B2B Payments',
      'Multi-currency',
      'Tax',
      'Shipping',
    ],
  },
  'adobe-commerce': {
    body: [
      'Adobe Commerce facilitates multichannel commerce for B2B and B2C brands, all on a single platform. With its modular core and flexible functionality, brands can seamlessly create a personalized commerce experience that scales.',
      "Adobe (Magento) Commerce is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Page Builder',
      'Product recommendations',
      'Inventory Management',
      'Integrated B2B',
      'Reports',
      'Payment Services',
    ],
  },
  woocommerce: {
    body: [
      'WooCommerce is a flexible, open-sourced ecommerce platform designed to scale with your business as you grow. With tools for merchants, developers, and large-scale enterprises, WooCommerce is a powerful and customizable ecommerce solution for online businesses.',
      "WooCommerce is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Inventory Management',
      'Mobile Access',
      'Multi-Currency Management',
      'Order Management',
      'Returns Management',
      'Shipping Management',
      'Shopping Cart',
      'Website Management',
      'Ecommerce Management',
    ],
  },
  prestashop: {
    body: [
      'Prestashop is a fully customizable ecommerce platform built to allow online merchants to create an online store and scale quickly. By enabling merchants to design and develop their own stores with open-source software, they can accelerate their growth with infinite possibilities for customization.',
      "Prestashop is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Online Store Builder',
      'Payment Processing',
      'Inventory Management',
      'Tax Management',
      'Order Management',
    ],
  },
  commercetools: {
    body: [
      "Commercetools is a cloud-based commerce platform designed to provide an omnichannel experience and modular approach to payments. Commercetool's composable architecture helps B2C, B2B, and D2C brands scale with a flexible tech stack to provide an elevated consumer experience.",
      'Optimize your cross-border payments with CommerceTools and Reach. Through a simple no-code integration, you can unlock local acquiring, localized pricing, automated FX, and more with our Merchant of Record model while maintaining your current CommerceTools infrastructure.',
    ],
    features: [
      'Over 300 APIs',
      'Data Security',
      'Inventory Management',
      'Multi-Currency',
      'Multi-Store',
      'eCommerce Management',
      'Multi-Channel Management',
    ],
  },
  zuora: {
    body: [
      'Zuora is a monetization platform that helps businesses unlock complex revenue streams and nurture subscriber relationships. Zuora simplifies the quote to cash processes for businesses regardless of whether they use a subscription-based model, consumption-based model, or a hybrid of the two.',
      "Zuora is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Billing & Invoicing',
      'Contingency Billing',
      'Contract/License Management',
      'Multi-Currency',
      'Recurring/Subscription Billing',
      'Tax Calculation & Management',
    ],
  },
  chargebee: {
    body: [
      'Chargebee is a powerful end-to-end revenue management platform and flexible growth engine for businesses that operate with a subscription-based model. Chargebee can help brands at every stage of the subscription life cycle with tools for recurring billing, receivables, and more.',
      "Chargebee is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Recurring Billing',
      'Subscription Management',
      'Payment Management',
      'Experience Management',
      'Insights & Reporting',
    ],
  },
  netsuite: {
    body: [
      'Netsuite is a cloud-based business software suite built to provide businesses with solutions for accounting, inventory management, order processing, and more. Integrating with Netsuite allows companies to automate and streamline business processes to free up resources.',
      "Netsuite is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Accounting Software',
      'Financial Management',
      'Global Business Management',
      'Inventory Management',
      'Order Management',
    ],
  },
  sap: {
    body: [
      "SAP is a leader in ERP and enterprise application software, enabling companies to connect all aspects of their business into a fully digital platform. SAP's ability to centralize multiple business functions, like finance, production, and more, allows companies to manage their operations more efficiently.",
      "SAP is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'ERP',
      'Supply Chain Management',
      'Financial Management',
      'Data & Analytics',
      'Application Automation & Development',
    ],
  },
  quickbooks: {
    body: [
      'Quickbooks is an industry leader in accounting and financial management software for SMBs. Quickbooks is a powerful tool designed to help small businesses save time, track income and expenses, and manage inventory in one solution.',
      "Quickbooks is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Tracks income & expenses',
      'Multi-currency support',
      'Invoice & accept payments',
      'Track sales & Sales Tax',
      'Maximize Tax Deductions',
      'Manage Bills & payments',
      'Track Inventory',
    ],
  },
  xero: {
    body: [
      'Xero is a cloud-based accounting software designed to allow SMBs to automate their accounting and simplify their operations. From reconciling bank transfers to managing invoices, Xero has the solutions to ensure businesses can feel confident in their numbers while saving time.',
      "Xero is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Accept Payments',
      'Bank Reconciliation',
      'Inventory management',
      'Online Invoicing',
      'Purchase Orders',
      'Sales Tax Management',
      'Accounting Dashboard',
    ],
  },
  'sap-hybris-commerce-cloud': {
    body: [
      "SAP Hybris is a cloud-based ecommerce and digital marketing platform for enterprise B2B or B2C businesses. With omnichannel ecommerce capabilities, businesses can deliver a consumer-grade buying experience on even the most complex purchases through SAP Hybris' cloud ecosystem.",
      "SAP Hybris Commerce Cloud is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Payment Processing',
      'Multi-currency',
      'Order Management',
      'Accounting Integration',
      'Channel Management',
    ],
  },
  'salesforce-commerce-cloud': {
    body: [
      "Salesforce Commerce Cloud is a world-leading B2B and B2C commerce solution. Salesforce's commerce cloud helps businesses reduce costs, increase sales, and adapt quickly with flexible tools and automation built for today's global marketplace.",
      "Salesforce Commerce Cloud is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Accounting Integration',
      'Inventory Management',
      'Multi-Channel Management',
      'Order Management',
      'Recurring Orders',
      'Shipping Management',
      'Shopping Cart',
      'Website Management',
    ],
  },
  aria: {
    body: [
      'Aria Billing Cloud is a SaaS billing automation platform for usage and subscription-based business models. Aira automates usage and subscription billing and payments, including the calculation and application of tax, for any industry and processes them in real-time.',
      'Enhance your cross-border payments with Aria and our Merchant of Record model. Unlock local processing through your existing Aria infrastructure with a no-code integration to our robust network of global entities and increase your cross-border conversions.',
    ],
    features: [
      'Omni-channel commerce',
      'Open product catalog',
      'Bundling & discounting',
      'Unlimited monetization models',
      'Billing & invoicing',
      'Taxation',
      'Payment Processing',
    ],
  },
  evergent: {
    body: [
      'Evergent is a powerful end-to-end revenue and customer management platform that helps brands seamlessly manage their subscription services and reduce churn. Evergent allows brands to onboard swiftly, retain more consumers, and simplify monetization.',
      "Evergent is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Customer 360',
      'Entitlements & Content Management',
      'Product Catalog',
      'Offer Management',
      'Workflow Management',
      'Core Billing',
      'Global Payments',
    ],
  },
  naviga: {
    body: [
      'Naviga is a content engagement platform built to manage subscriptions, distribution, and monetization of media and entertainment across multiple channels. Naviga helps businesses manage key workflows across their entire content lifecycle with one end-to-end scalable solution.',
      "Naviga is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Subscription Management',
      'Billing & Distribution',
      'Order Management',
      'Multi-channel Distribution & Monetization',
      'Fulfillment Management',
      'Branded Applications',
      'Contract Ingestion & Royalty Management',
    ],
  },
  spreedly: {
    body: [
      'Spreedly is a world-leading payments orchestration platform with a robust network of payment service providers to enable intelligent routing and a diverse suite of local and alternative payment methods. Spreedly provides a secure and flexible payments platform for businesses to expand globally.',
      'Cross-border transactions get better with the right partners. With a no-code integration to Reach, you can keep your existing Spreedly infrastructure while unlocking local acquiring, automated FX, local pricing, global tax compliance, and expert fraud management services.',
    ],
    features: [
      'Smart Routing',
      'Reconciliation',
      'Over 100 currencies',
      'Reporting',
      'Full Suite of Local & Alternative Payments',
    ],
  },
  'subscribe-pro': {
    body: [
      'Subscribe Pro enables businesses to optimize their subscription commerce by allowing them to add features like auto-shipping and recurring billing to their existing ecommerce websites. With easy subscription management, Subscribe Pro is a seamless solution for businesses looking to grow their recurring revenue.',
      "Subscribe Pro is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Comprehensive Gateway Support',
      'Subscription Management',
      'Customer Service Interface',
      'Automatic Subscription Error Handling',
      'Self-service Subscription Management',
    ],
  },
  vindicia: {
    body: [
      "Vindica is a subscription management and billing platform built to maximize value and reduce churn for businesses with recurring revenue. Vindica's management and payment recovery services help brands reduce their declined recurring transactions and ensure success at every stage of the subscription lifecycle.",
      "Vindicia is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Subscription management',
      'Payment Processing',
      'Failed Payments Recovery',
      'Fraud Management',
      'Tax Integration',
    ],
  },
  primer: {
    body: [
      "Primer is the world's first no-code automation platform for payments and commerce. By enabling merchants to unify their entire payment and commerce stack, they can build sophisticated, end-to-end flows with a checkout developers love.",
      "Primer is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Payments',
      'No-code automation',
      'Reconciliation across multiple processors',
      'Fraud Management',
    ],
  },
  bridgerpay: {
    body: [
      "Bridgerpay is the world's first payment operations platform created to automate all payment flows with a highly customizable interface. Brigerpay's world-leading platform helps any business solve cross-border payment processing challenges with scalable, codeless, unified, and agnostic software.",
      "Bridgerpay is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
    ],
    features: [
      'Advanced Tokenization & Security',
      'No-code Integration With PSPs',
      'Payouts Management',
      'Subscription Management',
      'Rescue Declined Transactions & Split Payments',
      'Recurring Billing',
      'Online Payments',
    ],
  },
  'cellpoint-digital': {
    body: [
      'Cellpoint Digital is a cutting-edge payments orchestration platform that provides global brands with access to over 400 alternative payment methods, payment service providers, acquirers, and more. CellPoint Digital helps businesses increase their approval rates and capture more revenue in international markets.',
      "Unlock local processing in your cross-border markets with CellPoint Digital and Reach. With a no-code integration, you can access our Merchant of Records' vast global entity structure while leveraging your existing CellPoint Digital infrastructure to save on cross-border fees.",
    ],
    features: [
      'Intelligent Routing',
      'Reporting',
      'Hosted Payments',
      'Payment Processing',
      'Full suite of alternative payment methods',
    ],
  },
}

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

async function updatePartners() {
  const payload = await getPayload({ config })

  console.log('Starting batch partner updates...\n')

  let updated = 0
  let skipped = 0
  let notFound = 0

  for (const [slug, content] of Object.entries(partnersContent)) {
    try {
      // Find integration by slug
      const integrations = await payload.find({
        collection: 'integrations',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (integrations.docs.length === 0) {
        console.log(`⚠️  Integration not found: ${slug}`)
        notFound++
        continue
      }

      const integration = integrations.docs[0]

      // Prepare update data
      const updateData: Record<string, unknown> = {}

      if (content.body && content.body.length > 0) {
        updateData.body = createLexicalBody(content.body)
      }

      if (content.features && content.features.length > 0) {
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
        updated++
      } else {
        console.log(`⏭️  Skipped ${slug} (no content)`)
        skipped++
      }
    } catch (error) {
      console.log(`❌ Error updating ${slug}:`, error)
    }
  }

  console.log('\n=== Summary ===')
  console.log(`✅ Updated: ${updated}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`⚠️  Not found: ${notFound}`)

  process.exit(0)
}

updatePartners().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
