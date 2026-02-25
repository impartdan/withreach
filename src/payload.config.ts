import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { CaseStudyCategories } from './collections/CaseStudyCategories'
import { IntegrationCategories } from './collections/IntegrationCategories'
import { Integrations } from './collections/Integrations'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { CaseStudies } from './collections/CaseStudies'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { NewsSettings } from './globals/NewsSettings/config'
import { CaseStudiesSettings } from './globals/CaseStudiesSettings/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeLogin: ['@/components/AdminLoginBackground#BeforeLogin'],
      graphics: {
        Logo: '@/components/AdminLogo#Logo',
      },
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: process.env.NODE_ENV === 'development',
  }),
  collections: [Pages, Posts, CaseStudies, Integrations, Categories, CaseStudyCategories, IntegrationCategories, Media, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, NewsSettings, CaseStudiesSettings],
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_ADDRESS || 'no-reply@example.com',
    defaultFromName: process.env.RESEND_FROM_NAME || 'Withreach',
    apiKey: process.env.RESEND_API_KEY,
  }),
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
