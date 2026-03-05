import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "integrations"
    ADD COLUMN IF NOT EXISTS "is_publicly_viewable" boolean DEFAULT true;
  `)

  await db.execute(sql`
    UPDATE "integrations"
    SET "is_publicly_viewable" = true
    WHERE "is_publicly_viewable" IS NULL;
  `)

  await db.execute(sql`
    ALTER TABLE "integrations"
    ALTER COLUMN "is_publicly_viewable" SET DEFAULT true;
  `)

  await db.execute(sql`
    ALTER TABLE "_integrations_v"
    ADD COLUMN IF NOT EXISTS "version_is_publicly_viewable" boolean DEFAULT true;
  `)

  await db.execute(sql`
    UPDATE "_integrations_v" v
    SET "version_is_publicly_viewable" = COALESCE(i."is_publicly_viewable", true)
    FROM "integrations" i
    WHERE v."parent_id" = i."id";
  `)

  await db.execute(sql`
    UPDATE "_integrations_v"
    SET "version_is_publicly_viewable" = true
    WHERE "version_is_publicly_viewable" IS NULL;
  `)

  payload.logger.info('Added and backfilled integrations public visibility columns')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_integrations_v"
    DROP COLUMN IF EXISTS "version_is_publicly_viewable";
  `)

  await db.execute(sql`
    ALTER TABLE "integrations"
    DROP COLUMN IF EXISTS "is_publicly_viewable";
  `)

  payload.logger.info('Removed integrations public visibility columns')
}
