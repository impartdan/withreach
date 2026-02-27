import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

async function getTablesWithShowGridLines(db: MigrateUpArgs['db']): Promise<string[]> {
  const result = await db.execute(sql`
    SELECT table_name
    FROM information_schema.columns
    WHERE column_name = 'blk_settings_show_grid_lines'
      AND table_schema = 'public'
    ORDER BY table_name
  `)
  return (result.rows as { table_name: string }[]).map((r) => r.table_name)
}

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  payload.logger.info('Finding tables with blk_settings_show_grid_lines column...')
  const tables = await getTablesWithShowGridLines(db)
  payload.logger.info(`Found ${tables.length} tables`)

  for (const table of tables) {
    await db.execute(
      sql.raw(`UPDATE "${table}" SET "blk_settings_show_grid_lines" = false WHERE "blk_settings_show_grid_lines" = true`),
    )
    payload.logger.info(`Updated ${table}`)
  }

  payload.logger.info('blk_settings_show_grid_lines set to false on all rows')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('down: no-op — cannot safely restore previous show_grid_lines values')
}
