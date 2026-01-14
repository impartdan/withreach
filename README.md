# With Reach

**Unlock Global Growth with Reach**

As your Merchant of Record, Reach handles payments, tax compliance, and fraud protection—easily activated within the platforms you already use.

This is the official website for With Reach, built with [Payload CMS](https://payloadcms.com) and [Next.js](https://nextjs.org).

## About With Reach

With Reach is a leading global Merchant of Record platform that enables businesses to sell cross-border with local payment options, seamless tax and compliance handling, and built-in fraud protection.

- 🌍 **Website**: [withreach.com](https://www.withreach.com)
- 💼 **LinkedIn**: [linkedin.com/company/with-reach](https://www.linkedin.com/company/with-reach/?originalSubdomain=ca)
- 📺 **YouTube**: [youtube.com/@withReach](https://www.youtube.com/@withReach)
- 📝 **Medium**: [medium.com/@WithReach](https://medium.com/@WithReach)

## Features

### Content Management
- **Flexible Page Builder**: Create dynamic pages using reusable content blocks
- **Rich Content Blocks**: Multiple block types including Content, Media, Banner, Call to Action, Archive, and more
- **Blog & Resources**: Full-featured blog with categories, author support, and SEO optimization
- **Integration Showcase**: Display partner integrations with filtering, sorting, and pinned/featured capabilities

### Developer Experience
- **Type-Safe Development**: Full TypeScript support with auto-generated types from Payload config
- **Hot Module Replacement**: Fast development with Next.js HMR
- **Database Migrations**: Version-controlled schema changes with Payload migrations
- **Live Preview**: Real-time content preview in the CMS admin panel

### Integrations & Extensions
- **Partner Integrations**: Comprehensive integrations collection with categories and featured display
- **Form Builder**: Create custom forms with multiple field types and validation
- **SEO Plugin**: Built-in SEO management with metadata, Open Graph, and sitemap generation
- **HubSpot Forms**: Native HubSpot form integration for lead capture

### Production Ready
- **PostgreSQL Database**: Robust data persistence with migrations support
- **Media Management**: Efficient media handling with Vercel Blob storage
- **Search Integration**: Full-text search powered by Payload's search plugin
- **Security**: Built-in authentication, role-based access control, and secure admin panel

## Quick Start

### Prerequisites

- Node.js 18.20.2 or higher
- pnpm 9 or 10

### Development

1. Clone the repository
2. Copy the example environment variables: `cp .env.example .env`
3. Configure your environment variables (see [Environment Variables](#environment-variables) below)
4. Install dependencies: `pnpm install`
5. Start the dev server: `pnpm dev`
6. Open `http://localhost:3000` in your browser

Follow the on-screen instructions to login and create your first admin user.

### Environment Variables

Key environment variables you'll need to configure:

- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Secret key for JWT tokens (generate a secure random string)
- `NEXT_PUBLIC_SERVER_URL` - Your site URL (e.g., `http://localhost:3000` for development)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token (for media uploads)
- `RESEND_API_KEY` - Resend API key for email functionality (optional)

See `.env.example` for a complete list of available environment variables.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm test` - Run all tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm test:int` - Run integration tests
- `pnpm generate:types` - Generate TypeScript types from Payload config
- `pnpm seed:integrations` - Seed integration partners data
- `pnpm seed:integration-logos` - Upload integration logos

## Working with Postgres

This project uses PostgreSQL as the database. A few important notes:

### Local Development

By default, the Postgres adapter has `push: true` for development environments, which allows you to add, modify, and remove fields and collections without needing to run migrations.

If your database is pointed to production, set `push: false` to avoid data loss or migration conflicts.

### Migrations

[Migrations](https://payloadcms.com/docs/database/migrations) track your schema changes:

**Create a migration:**
```bash
pnpm payload migrate:create
```

**Run migrations (on server before starting):**
```bash
pnpm payload migrate
```

## Docker

To run this project with Docker:

1. Ensure the `.env` file is configured with all required environment variables
2. Build and start the containers: `docker-compose up`
3. The application will be available at `http://localhost:3000`
4. On first run, navigate to `/admin` and create your first admin user

The Docker setup includes:
- Next.js application container
- PostgreSQL database container
- Automatic database initialization

To rebuild after making changes:
```bash
docker-compose up --build
```

To stop the containers:
```bash
docker-compose down
```

## Production

To run in production:

1. Build the application: `pnpm build`
2. Run migrations: `pnpm payload migrate`
3. Start the server: `pnpm start`

## Deployment

### Vercel

This project is configured for deployment on Vercel with:
- Vercel Postgres adapter
- Vercel Blob storage for media

Refer to the [Payload deployment documentation](https://payloadcms.com/docs/production/deployment) for detailed instructions.

### Self-Hosting

You can deploy this application to any Node.js hosting provider, including:
- VPS (Virtual Private Server)
- DigitalOcean App Platform
- AWS, GCP, Azure
- Coolify or similar platforms

Ensure you:
1. Set all required environment variables
2. Run migrations before starting the application
3. Configure your database connection properly

## Tech Stack

- **CMS**: [Payload CMS](https://payloadcms.com)
- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Database**: PostgreSQL
- **Styling**: [TailwindCSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Language**: TypeScript
- **Forms**: React Hook Form

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── (frontend)/  # Public-facing pages
│   └── (payload)/   # CMS admin routes
├── blocks/           # Reusable content blocks
│   ├── ArchiveBlock/        # Blog post archives
│   ├── Banner/              # Announcement banners
│   ├── CallToAction/        # CTA blocks
│   ├── Code/                # Code snippets with syntax highlighting
│   ├── Content/             # Rich text content
│   ├── Form/                # Custom form builder
│   ├── HubspotForm/         # HubSpot form integration
│   ├── Integrations/        # Partner integrations display with filtering and pinning capabilities
│   ├── LogoList/            # Logo grid display
│   ├── MediaBlock/          # Image and video blocks
│   └── RelatedPosts/        # Related content suggestions
├── collections/      # Payload collections
│   ├── Pages.ts             # Page content
│   ├── Posts.ts             # Blog posts
│   ├── Integrations.ts      # Partner integrations
│   ├── Categories.ts        # Content categories
│   ├── IntegrationCategories.ts
│   ├── Media.ts             # Media assets
│   └── Users.ts             # User accounts
├── components/       # React components
│   ├── ui/                  # shadcn/ui components
│   ├── RichText/            # Rich text renderer
│   ├── Media/               # Media display components
│   └── ...
├── fields/           # Custom Payload fields
├── heros/            # Hero components (various layouts)
├── utilities/        # Utility functions
├── providers/        # React context providers
├── scripts/          # Data seeding and maintenance scripts
└── payload.config.ts # Payload CMS configuration
```

## Content Blocks

The website uses a flexible block-based content system. Key blocks include:

- **Integrations Block**: Display partner integrations with advanced features:
  - Filter by category
  - Sort alphabetically or by featured status
  - Pin specific integrations to always appear first
  - Show selected integrations or all integrations
  - Visual indicators for pinned and featured integrations
- **Archive Block**: Display filtered lists of blog posts with pagination
- **Form Block**: Custom forms with multiple field types (text, email, select, checkbox, etc.)
- **HubSpot Form**: Embed HubSpot forms for lead capture
- **Content Block**: Rich text content with full Lexical editor support
- **Media Block**: Display images and videos with various layout options
- **Call to Action**: Highlight important actions with links
- **Banner**: Display site-wide announcements
- **Logo List**: Showcase partner or client logos

## Contributing

This is a private repository for the With Reach website. Contributions are limited to the development team.

### Development Workflow

1. Create a feature branch from the main branch
2. Make your changes following the existing code style
3. Test your changes locally
4. Run linting: `pnpm lint:fix`
5. Commit your changes with clear, descriptive messages
6. Create a pull request for review

### Code Style

- Follow the ESLint configuration provided
- Use TypeScript for all new code
- Follow React and Next.js best practices
- Use Prettier for code formatting (configured in `.prettierrc.json`)

### Database Changes

When making schema changes:
1. Use `pnpm generate:types` to update TypeScript types
2. Create a migration: `pnpm payload migrate:create`
3. Test the migration locally before deploying

## Support

For questions or issues related to With Reach services, please contact support through [withreach.com](https://www.withreach.com).

For technical issues with this codebase, please reach out to the development team through your standard internal communication channels.
