import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  payload.logger.info('Adding logo_id column to pages_blocks_cta_small_cards...')

  await db.execute(sql`
    ALTER TABLE "pages_blocks_cta_small_cards"
    ADD COLUMN IF NOT EXISTS "logo_id" integer
      REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
  `)

  payload.logger.info('logo_id column added to pages_blocks_cta_small_cards')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Removing logo_id column from pages_blocks_cta_small_cards...')

  await db.execute(sql`
    ALTER TABLE "pages_blocks_cta_small_cards"
    DROP COLUMN IF EXISTS "logo_id";
  `)

  payload.logger.info('logo_id column removed from pages_blocks_cta_small_cards')
}
