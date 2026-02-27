import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  payload.logger.info('Moving logo_id from pages_blocks_cta_small to pages_blocks_cta_small_cards...')

  await db.execute(sql`
    ALTER TABLE "pages_blocks_cta_small"
    DROP COLUMN IF EXISTS "logo_id";
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_cta_small_cards"
    ADD COLUMN IF NOT EXISTS "logo_id" integer
      REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
  `)

  payload.logger.info('logo_id moved to pages_blocks_cta_small_cards')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Reverting: moving logo_id back to pages_blocks_cta_small...')

  await db.execute(sql`
    ALTER TABLE "pages_blocks_cta_small_cards"
    DROP COLUMN IF EXISTS "logo_id";
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_cta_small"
    ADD COLUMN IF NOT EXISTS "logo_id" integer
      REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
  `)

  payload.logger.info('logo_id reverted to pages_blocks_cta_small')
}
