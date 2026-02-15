import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // Step 1: Convert hero_type columns to text so we can remap values
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name, c.udt_name
        FROM information_schema.columns c
        WHERE c.udt_name IN ('enum_pages_hero_type', 'enum__pages_v_hero_type')
          AND c.table_schema = 'public'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE text USING %I::text',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  payload.logger.info('Converted hero_type columns to text')

  // Step 2: Remap old values to new ones
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.column_name = 'hero_type'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND (c.table_name = 'pages' OR c.table_name = '_pages_v')
      LOOP
        EXECUTE format($q$
          UPDATE %I.%I SET %I = CASE %I
            WHEN 'fullscreen' THEN 'homeHero'
            WHEN 'highImpact' THEN 'none'
            WHEN 'mediumImpact' THEN 'none'
            WHEN 'lowImpact' THEN 'none'
            WHEN 'textAndImage' THEN 'none'
            WHEN 'backgroundImage' THEN 'none'
            ELSE %I
          END
        $q$, r.table_schema, r.table_name, r.column_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  payload.logger.info('Remapped old hero type values to new values')

  // Step 3: Drop old enum types
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_pages_hero_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_hero_type";
  `)

  payload.logger.info('Dropped old hero type enums')

  // Step 4: Create new enum types
  await db.execute(sql`
    CREATE TYPE "public"."enum_pages_hero_type" AS ENUM ('none', 'homeHero', 'solutionsHero', 'partnerHero', 'textHero', 'supportHero');
    CREATE TYPE "public"."enum__pages_v_hero_type" AS ENUM ('none', 'homeHero', 'solutionsHero', 'partnerHero', 'textHero', 'supportHero');
  `)

  payload.logger.info('Created new hero type enums')

  // Step 5: Convert text columns back to enum type
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.column_name = 'hero_type'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND c.table_name = 'pages'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE "public"."enum_pages_hero_type" USING %I::"public"."enum_pages_hero_type"',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;

      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.column_name = 'hero_type'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND c.table_name = '_pages_v'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE "public"."enum__pages_v_hero_type" USING %I::"public"."enum__pages_v_hero_type"',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  payload.logger.info('Hero type migration complete')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  // Revert: convert columns to text
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.udt_name IN ('enum_pages_hero_type', 'enum__pages_v_hero_type')
          AND c.table_schema = 'public'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE text USING %I::text',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  // Remap new values back to old
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.column_name = 'hero_type'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND (c.table_name = 'pages' OR c.table_name = '_pages_v')
      LOOP
        EXECUTE format($q$
          UPDATE %I.%I SET %I = CASE %I
            WHEN 'homeHero' THEN 'fullscreen'
            WHEN 'solutionsHero' THEN 'none'
            WHEN 'partnerHero' THEN 'none'
            WHEN 'textHero' THEN 'none'
            WHEN 'supportHero' THEN 'none'
            ELSE %I
          END
        $q$, r.table_schema, r.table_name, r.column_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  // Recreate old enum types
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_pages_hero_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_hero_type";
    CREATE TYPE "public"."enum_pages_hero_type" AS ENUM ('none', 'highImpact', 'mediumImpact', 'lowImpact', 'fullscreen', 'textAndImage', 'backgroundImage');
    CREATE TYPE "public"."enum__pages_v_hero_type" AS ENUM ('none', 'highImpact', 'mediumImpact', 'lowImpact', 'fullscreen', 'textAndImage', 'backgroundImage');
  `)

  // Convert back to enum
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.column_name = 'hero_type'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND c.table_name = 'pages'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE "public"."enum_pages_hero_type" USING %I::"public"."enum_pages_hero_type"',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;

      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.column_name = 'hero_type'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND c.table_name = '_pages_v'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE "public"."enum__pages_v_hero_type" USING %I::"public"."enum__pages_v_hero_type"',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  payload.logger.info('Reverted hero type migration')
}
