import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_img_left_txt_v"
    DROP CONSTRAINT IF EXISTS "_img_left_txt_v_parent_id_fk";
  `)

  payload.logger.info('Dropped _img_left_txt_v_parent_id_fk to support shared block versions')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('down: no-op for _img_left_txt_v_parent_id_fk')
}
