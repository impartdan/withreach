import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

const NEW_ENUM_VALUES = [
  'brand-off-white',
  'brand-linen',
  'brand-black',
  'brand-white',
  'brand-olive',
  'brand-gray',
  'brand-purple',
  'brand-peach',
  'brand-green',
  'brand-blue',
  'brand-blue-light',
  'primary',
  'secondary',
  'accent',
  'muted',
  'card',
  'background',
]

const OLD_ENUM_VALUES = ['none', 'primary', 'secondary', 'accent', 'muted', 'card', 'background']

async function getTablesWithBgColor(db: MigrateUpArgs['db']): Promise<string[]> {
  const result = await db.execute(sql`
    SELECT table_name
    FROM information_schema.columns
    WHERE column_name = 'block_settings_background_color'
      AND table_schema = 'public'
    ORDER BY table_name
  `)
  return (result.rows as { table_name: string }[]).map((r) => r.table_name)
}

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  payload.logger.info('Collecting tables with block_settings_background_color column...')
  const tables = await getTablesWithBgColor(db)
  payload.logger.info(`Found ${tables.length} tables`)

  // Step 1: Drop defaults and convert each column from enum → text
  for (const table of tables) {
    await db.execute(
      sql.raw(`ALTER TABLE "${table}" ALTER COLUMN "block_settings_background_color" DROP DEFAULT`),
    )
    await db.execute(
      sql.raw(
        `ALTER TABLE "${table}" ALTER COLUMN "block_settings_background_color" TYPE text USING "block_settings_background_color"::text`,
      ),
    )
  }

  // Step 2: Drop the old enum (CASCADE handles any remaining dependencies)
  await db.execute(sql.raw(`DROP TYPE IF EXISTS "public"."bg_color" CASCADE`))

  // Step 3: Create the new enum with brand colors
  const enumValues = NEW_ENUM_VALUES.map((v) => `'${v}'`).join(', ')
  await db.execute(sql.raw(`CREATE TYPE "public"."bg_color" AS ENUM (${enumValues})`))

  // Step 4: Convert each column back from text → new enum, mapping 'none' → NULL
  for (const table of tables) {
    await db.execute(
      sql.raw(`
        ALTER TABLE "${table}"
          ALTER COLUMN "block_settings_background_color"
          TYPE "public"."bg_color"
          USING CASE
            WHEN "block_settings_background_color" = 'none' THEN NULL
            WHEN "block_settings_background_color" = ANY(ARRAY[${enumValues}]) THEN "block_settings_background_color"::"public"."bg_color"
            ELSE NULL
          END
      `),
    )
  }

  payload.logger.info('bg_color enum updated successfully')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Reverting bg_color enum...')
  const tables = await getTablesWithBgColor(db)

  for (const table of tables) {
    await db.execute(
      sql.raw(`ALTER TABLE "${table}" ALTER COLUMN "block_settings_background_color" DROP DEFAULT`),
    )
    await db.execute(
      sql.raw(
        `ALTER TABLE "${table}" ALTER COLUMN "block_settings_background_color" TYPE text USING "block_settings_background_color"::text`,
      ),
    )
  }

  await db.execute(sql.raw(`DROP TYPE IF EXISTS "public"."bg_color" CASCADE`))

  const oldValues = OLD_ENUM_VALUES.map((v) => `'${v}'`).join(', ')
  await db.execute(sql.raw(`CREATE TYPE "public"."bg_color" AS ENUM (${oldValues})`))

  for (const table of tables) {
    await db.execute(
      sql.raw(`
        ALTER TABLE "${table}"
          ALTER COLUMN "block_settings_background_color"
          TYPE "public"."bg_color"
          USING CASE
            WHEN "block_settings_background_color" = ANY(ARRAY[${oldValues}]) THEN "block_settings_background_color"::"public"."bg_color"
            ELSE NULL
          END
      `),
    )
  }

  payload.logger.info('bg_color enum reverted')
}
