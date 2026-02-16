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
import * as migration from '../migrations/20260216_pages_nested_docs'

const MIGRATION_NAME = '20260216_pages_nested_docs'

async function main() {
  const payload = await getPayload({ config })

  const { existingMigrations, latestBatch } = await getMigrations({ payload })
  if (existingMigrations.some((m) => m.name === MIGRATION_NAME)) {
    console.log(`Migration ${MIGRATION_NAME} already applied.`)
    process.exit(0)
  }

  const newBatch = (latestBatch ?? 0) + 1

  try {
    await migration.up({ db: payload.db as any, payload })
    await payload.create({
      collection: 'payload-migrations',
      data: { name: MIGRATION_NAME, batch: newBatch },
      req: await createLocalReq({}, payload),
    })
    console.log(`Migration ${MIGRATION_NAME} applied.`)
  } catch (err) {
    throw err
  }
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
