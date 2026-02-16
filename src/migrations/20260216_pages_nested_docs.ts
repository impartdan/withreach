import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // Add parent_id to pages for nested-docs plugin
  await db.execute(sql`
    ALTER TABLE "pages"
    ADD COLUMN IF NOT EXISTS "parent_id" integer
  `)
  await db.execute(sql`
    ALTER TABLE "pages"
    ADD CONSTRAINT "pages_parent_id_pages_id_fk"
    FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id")
    ON DELETE SET NULL ON UPDATE NO ACTION
  `)

  payload.logger.info('Added parent_id to pages')

  // Create pages_breadcrumbs table (nested-docs plugin)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_breadcrumbs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "doc_id" integer,
      "url" varchar,
      "label" varchar
    )
  `)
  await db.execute(sql`
    ALTER TABLE "pages_breadcrumbs"
    ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk"
    FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id")
    ON DELETE SET NULL ON UPDATE NO ACTION
  `)
  await db.execute(sql`
    ALTER TABLE "pages_breadcrumbs"
    ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk"
    FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id")
    ON DELETE CASCADE ON UPDATE NO ACTION
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_order_idx"
    ON "pages_breadcrumbs" USING btree ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_parent_id_idx"
    ON "pages_breadcrumbs" USING btree ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_doc_idx"
    ON "pages_breadcrumbs" USING btree ("doc_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_parent_idx"
    ON "pages" USING btree ("parent_id")
  `)

  payload.logger.info('Created pages_breadcrumbs table and indexes')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP INDEX IF EXISTS "pages_parent_idx"`)
  await db.execute(sql`DROP INDEX IF EXISTS "pages_breadcrumbs_doc_idx"`)
  await db.execute(sql`DROP INDEX IF EXISTS "pages_breadcrumbs_parent_id_idx"`)
  await db.execute(sql`DROP INDEX IF EXISTS "pages_breadcrumbs_order_idx"`)

  await db.execute(sql`DROP TABLE IF EXISTS "pages_breadcrumbs" CASCADE`)

  await db.execute(sql`
    ALTER TABLE "pages"
    DROP CONSTRAINT IF EXISTS "pages_parent_id_pages_id_fk"
  `)
  await db.execute(sql`
    ALTER TABLE "pages"
    DROP COLUMN IF EXISTS "parent_id"
  `)

  payload.logger.info('Reverted pages nested-docs migration')
}
