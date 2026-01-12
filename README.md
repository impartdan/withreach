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

## Quick Start

### Prerequisites

- Node.js 18.20.2 or higher
- pnpm 9 or 10

### Development

1. Clone the repository
2. Copy the example environment variables: `cp .env.example .env`
3. Install dependencies: `pnpm install`
4. Start the dev server: `pnpm dev`
5. Open `http://localhost:3000` in your browser

Follow the on-screen instructions to login and create your first admin user.

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

1. Ensure the `.env` file is configured
2. Run `docker-compose up`
3. Open `http://localhost:3000` and create your first admin user

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
├── blocks/           # Reusable content blocks
├── collections/      # Payload collections
├── components/       # React components
├── fields/           # Custom Payload fields
├── heros/            # Hero components
├── utilities/        # Utility functions
└── payload.config.ts # Payload CMS configuration
```

## Support

For questions or issues related to With Reach services, please contact support through [withreach.com](https://www.withreach.com).

For technical issues with this codebase, please check the documentation or reach out to the development team.
