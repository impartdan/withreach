import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum_pages_blocks_cta_large_max_width'
      ) THEN
        CREATE TYPE "enum_pages_blocks_cta_large_max_width" AS ENUM (
          'max-w-sm',
          'max-w-md',
          'max-w-lg',
          'max-w-xl',
          'max-w-2xl',
          'max-w-3xl',
          'max-w-4xl',
          'max-w-5xl',
          'max-w-6xl',
          'none'
        );
      END IF;
    END
    $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum__pages_v_blocks_cta_large_max_width'
      ) THEN
        CREATE TYPE "enum__pages_v_blocks_cta_large_max_width" AS ENUM (
          'max-w-sm',
          'max-w-md',
          'max-w-lg',
          'max-w-xl',
          'max-w-2xl',
          'max-w-3xl',
          'max-w-4xl',
          'max-w-5xl',
          'max-w-6xl',
          'none'
        );
      END IF;
    END
    $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum_integrations_blocks_cta_large_max_width'
      ) THEN
        CREATE TYPE "enum_integrations_blocks_cta_large_max_width" AS ENUM (
          'max-w-sm',
          'max-w-md',
          'max-w-lg',
          'max-w-xl',
          'max-w-2xl',
          'max-w-3xl',
          'max-w-4xl',
          'max-w-5xl',
          'max-w-6xl',
          'none'
        );
      END IF;
    END
    $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum__integrations_v_blocks_cta_large_max_width'
      ) THEN
        CREATE TYPE "enum__integrations_v_blocks_cta_large_max_width" AS ENUM (
          'max-w-sm',
          'max-w-md',
          'max-w-lg',
          'max-w-xl',
          'max-w-2xl',
          'max-w-3xl',
          'max-w-4xl',
          'max-w-5xl',
          'max-w-6xl',
          'none'
        );
      END IF;
    END
    $$;
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_cta_large"
    ADD COLUMN IF NOT EXISTS "max_width" "enum_pages_blocks_cta_large_max_width" DEFAULT 'max-w-3xl';
  `)

  await db.execute(sql`
    UPDATE "pages_blocks_cta_large"
    SET "max_width" = 'max-w-3xl'
    WHERE "max_width" IS NULL;
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_cta_large"
    ADD COLUMN IF NOT EXISTS "max_width" "enum__pages_v_blocks_cta_large_max_width" DEFAULT 'max-w-3xl';
  `)

  await db.execute(sql`
    UPDATE "_pages_v_blocks_cta_large"
    SET "max_width" = 'max-w-3xl'
    WHERE "max_width" IS NULL;
  `)

  await db.execute(sql`
    ALTER TABLE "integrations_blocks_cta_large"
    ADD COLUMN IF NOT EXISTS "max_width" "enum_integrations_blocks_cta_large_max_width" DEFAULT 'max-w-3xl';
  `)

  await db.execute(sql`
    UPDATE "integrations_blocks_cta_large"
    SET "max_width" = 'max-w-3xl'
    WHERE "max_width" IS NULL;
  `)

  await db.execute(sql`
    ALTER TABLE "_integrations_v_blocks_cta_large"
    ADD COLUMN IF NOT EXISTS "max_width" "enum__integrations_v_blocks_cta_large_max_width" DEFAULT 'max-w-3xl';
  `)

  await db.execute(sql`
    UPDATE "_integrations_v_blocks_cta_large"
    SET "max_width" = 'max-w-3xl'
    WHERE "max_width" IS NULL;
  `)

  payload.logger.info('Added CTA Large max width columns for pages and integrations')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_integrations_v_blocks_cta_large"
    DROP COLUMN IF EXISTS "max_width";
  `)

  await db.execute(sql`
    ALTER TABLE "integrations_blocks_cta_large"
    DROP COLUMN IF EXISTS "max_width";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_cta_large"
    DROP COLUMN IF EXISTS "max_width";
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_cta_large"
    DROP COLUMN IF EXISTS "max_width";
  `)

  await db.execute(sql`
    DROP TYPE IF EXISTS "enum__integrations_v_blocks_cta_large_max_width";
  `)

  await db.execute(sql`
    DROP TYPE IF EXISTS "enum_integrations_blocks_cta_large_max_width";
  `)

  await db.execute(sql`
    DROP TYPE IF EXISTS "enum__pages_v_blocks_cta_large_max_width";
  `)

  await db.execute(sql`
    DROP TYPE IF EXISTS "enum_pages_blocks_cta_large_max_width";
  `)

  payload.logger.info('Removed CTA Large max width columns for pages and integrations')
}
