/**
 * One-off script to run only the 20260216_pages_nested_docs migration.
 * Use this when your DB was created with push (dev) and full "payload migrate"
 * would re-run initial migrations that already exist.
 *
 * Run: pnpm tsx src/scripts/run-pages-nested-docs-migration.ts
 */
import 'dotenv/config'
import { getPayload, getMigrations, createLocalReq } from 'payload'
import config from '@payload-config'

const EXISTING_MIGRATION_NAMES = [
  '20260110_034155',
  '20260111_230934',
  '20260112_010500',
  '20260112_074700',
  '20260214_migrate_spacing_enums',
  '20260215_migrate_hero_types',
]

async function main() {
  const payload = await getPayload({ config })

  // Ensure payload_migrations table has the first 6 migrations marked as run
  // so that payload.db.migrate() only runs 20260216_pages_nested_docs
  const { existingMigrations, latestBatch } = await getMigrations({ payload })
  const newBatch = (latestBatch ?? 0) + 1

  for (const name of EXISTING_MIGRATION_NAMES) {
    if (existingMigrations.some((m) => m.name === name)) continue
    const req = await createLocalReq({}, payload)
    await payload.create({
      collection: 'payload-migrations',
      data: { name, batch: newBatch },
      req,
    })
    console.log(`Marked migration as run: ${name}`)
  }

  // Run migrate; it will skip the 6 we marked and run only 20260216_pages_nested_docs
  await payload.db.migrate()
  console.log('Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
