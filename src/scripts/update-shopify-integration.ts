import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const updateShopifyIntegration = async () => {
  const payload = await getPayload({ config })

  try {
    // Find Shopify integration by title or slug
    const integrations = await payload.find({
      collection: 'integrations',
      where: {
        or: [{ title: { equals: 'Shopify' } }, { slug: { equals: 'shopify' } }],
      },
      limit: 1,
    })

    if (integrations.docs.length === 0) {
      console.error('❌ Shopify integration not found')
      process.exit(1)
    }

    const shopifyIntegration = integrations.docs[0]
    console.log(`Found Shopify integration with ID: ${shopifyIntegration.id}`)

    // Update with body and features content from https://www.withreach.com/partners/shopify
    await payload.update({
      collection: 'integrations',
      id: shopifyIntegration.id,
      data: {
        body: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Shopify is an industry-leading commerce platform built to offer brands everything they need to start, grow and manage their online business. From no-code customizations for creating unique shopping experiences to shipping management, Shopify provides a full-service solution for brands to enhance their business.',
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
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Shopify is even better with Reach. Businesses that operate through a single entity yet transact globally can now unlock Reach's global entity structure, and turn their cross-border payments into domestic payments.",
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
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        features: {
          root: {
            type: 'root',
            children: [
              {
                type: 'list',
                listType: 'bullet',
                start: 1,
                tag: 'ul',
                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    children: [
                      {
                        type: 'text',
                        text: 'Payment Processing',
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
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    children: [
                      {
                        type: 'text',
                        text: 'Multi Store',
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
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    children: [
                      {
                        type: 'text',
                        text: 'Sales Tax Management',
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
                  },
                  {
                    type: 'listitem',
                    value: 4,
                    children: [
                      {
                        type: 'text',
                        text: 'Inventory Management',
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
                  },
                  {
                    type: 'listitem',
                    value: 5,
                    children: [
                      {
                        type: 'text',
                        text: 'Shopping Cart',
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
                  },
                ],
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
        },
      },
    })

    console.log('✅ Successfully updated Shopify integration')
    console.log('   - Added body content (2 paragraphs)')
    console.log('   - Added features list (5 items)')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating integration:', error)
    process.exit(1)
  }
}

updateShopifyIntegration()
