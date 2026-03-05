import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const before = await db.execute(sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE _status = 'published')::int AS published,
      COUNT(*) FILTER (WHERE _status = 'draft')::int AS draft
    FROM integrations
  `)

  const beforeRow = before.rows[0] as { total: number; published: number; draft: number }
  payload.logger.info(
    `integrations before migration: total=${beforeRow.total}, published=${beforeRow.published}, draft=${beforeRow.draft}`,
  )

  const hasLegacyNameColumnResult = await db.execute(sql`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'integrations'
        AND column_name = 'name'
    ) AS exists
  `)
  const hasLegacyNameColumn = (hasLegacyNameColumnResult.rows[0] as { exists: boolean }).exists

  if (hasLegacyNameColumn) {
    await db.execute(sql`
      UPDATE integrations
      SET title = name
      WHERE (title IS NULL OR btrim(title) = '')
        AND name IS NOT NULL
        AND btrim(name) <> ''
    `)
    payload.logger.info('Backfilled integrations.title from legacy integrations.name')
  }

  await db.execute(sql`
    UPDATE integrations
    SET _status = 'published'
    WHERE _status = 'draft'
      AND title IS NOT NULL
      AND btrim(title) <> ''
      AND slug IS NOT NULL
      AND btrim(slug) <> ''
  `)

  await db.execute(sql`
    UPDATE _integrations_v
    SET version__status = 'published'
    WHERE latest = true
      AND parent_id IN (
        SELECT id FROM integrations WHERE _status = 'published'
      )
  `)

  const after = await db.execute(sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE _status = 'published')::int AS published,
      COUNT(*) FILTER (WHERE _status = 'draft')::int AS draft
    FROM integrations
  `)
  const afterRow = after.rows[0] as { total: number; published: number; draft: number }
  payload.logger.info(
    `integrations after migration: total=${afterRow.total}, published=${afterRow.published}, draft=${afterRow.draft}`,
  )
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('down: no-op — cannot safely infer which integrations were intentionally draft')
}
