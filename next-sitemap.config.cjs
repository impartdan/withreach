const normalizeSiteUrl = (rawUrl) => {
  if (!rawUrl) return undefined

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl
  }

  return `https://${rawUrl}`
}

const SITE_URL =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SERVER_URL) ||
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/integrations-sitemap.xml', '/case-studies-sitemap.xml', '/*', '/posts/*', '/partners/integrations/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/case-studies-sitemap.xml`,
      `${SITE_URL}/integrations-sitemap.xml`,
    ],
  },
}
