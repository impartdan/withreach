import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // Step 1: Convert all columns using 'pt' enum to text and update values
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      -- Convert all columns using 'pt' enum type to text
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.udt_name = 'pt' AND c.table_schema = 'public'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE text USING %I::text',
          r.table_schema, r.table_name, r.column_name, r.column_name);
        EXECUTE format($q$
          UPDATE %I.%I SET %I = CASE %I
            WHEN 'small' THEN 'sm'
            WHEN 'medium' THEN 'md'
            WHEN 'large' THEN 'lg'
            WHEN 'xlarge' THEN 'xl'
            ELSE %I
          END
        $q$, r.table_schema, r.table_name, r.column_name, r.column_name, r.column_name);
      END LOOP;

      -- Convert all columns using 'pb' enum type to text
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.udt_name = 'pb' AND c.table_schema = 'public'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE text USING %I::text',
          r.table_schema, r.table_name, r.column_name, r.column_name);
        EXECUTE format($q$
          UPDATE %I.%I SET %I = CASE %I
            WHEN 'small' THEN 'sm'
            WHEN 'medium' THEN 'md'
            WHEN 'large' THEN 'lg'
            WHEN 'xlarge' THEN 'xl'
            ELSE %I
          END
        $q$, r.table_schema, r.table_name, r.column_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  payload.logger.info('Converted padding columns to text and updated values')

  // Step 2: Drop old enum types
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."pt";
    DROP TYPE IF EXISTS "public"."pb";
  `)

  payload.logger.info('Dropped old pt/pb enum types')

  // Step 3: Create new enum types with spacing token values
  await db.execute(sql`
    CREATE TYPE "public"."pt" AS ENUM ('none', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl');
    CREATE TYPE "public"."pb" AS ENUM ('none', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl');
  `)

  payload.logger.info('Created new pt/pb enum types with spacing token values')

  // Step 4: Convert text columns back to the new enum types
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        JOIN information_schema.tables t
          ON t.table_schema = c.table_schema AND t.table_name = c.table_name
        WHERE c.column_name LIKE '%_pt'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND t.table_type = 'BASE TABLE'
          AND c.table_name LIKE '%_blocks_%'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE "public"."pt" USING %I::"public"."pt"',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;

      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        JOIN information_schema.tables t
          ON t.table_schema = c.table_schema AND t.table_name = c.table_name
        WHERE c.column_name LIKE '%_pb'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND t.table_type = 'BASE TABLE'
          AND c.table_name LIKE '%_blocks_%'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE "public"."pb" USING %I::"public"."pb"',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  payload.logger.info('Converted columns back to new enum types — spacing migration complete')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.udt_name = 'pt' AND c.table_schema = 'public'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE text USING %I::text',
          r.table_schema, r.table_name, r.column_name, r.column_name);
        EXECUTE format($q$
          UPDATE %I.%I SET %I = CASE %I
            WHEN 'sm' THEN 'small'
            WHEN 'md' THEN 'medium'
            WHEN 'lg' THEN 'large'
            WHEN 'xl' THEN 'xlarge'
            ELSE %I
          END
        $q$, r.table_schema, r.table_name, r.column_name, r.column_name, r.column_name);
      END LOOP;

      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        WHERE c.udt_name = 'pb' AND c.table_schema = 'public'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE text USING %I::text',
          r.table_schema, r.table_name, r.column_name, r.column_name);
        EXECUTE format($q$
          UPDATE %I.%I SET %I = CASE %I
            WHEN 'sm' THEN 'small'
            WHEN 'md' THEN 'medium'
            WHEN 'lg' THEN 'large'
            WHEN 'xl' THEN 'xlarge'
            ELSE %I
          END
        $q$, r.table_schema, r.table_name, r.column_name, r.column_name, r.column_name);
      END LOOP;
    END $$;

    DROP TYPE IF EXISTS "public"."pt";
    DROP TYPE IF EXISTS "public"."pb";
    CREATE TYPE "public"."pt" AS ENUM ('none', 'small', 'medium', 'large', 'xlarge');
    CREATE TYPE "public"."pb" AS ENUM ('none', 'small', 'medium', 'large', 'xlarge');

    DO $$
    DECLARE
      r RECORD;
    BEGIN
      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        JOIN information_schema.tables t
          ON t.table_schema = c.table_schema AND t.table_name = c.table_name
        WHERE c.column_name LIKE '%_pt'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND t.table_type = 'BASE TABLE'
          AND c.table_name LIKE '%_blocks_%'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE "public"."pt" USING %I::"public"."pt"',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;

      FOR r IN
        SELECT c.table_schema, c.table_name, c.column_name
        FROM information_schema.columns c
        JOIN information_schema.tables t
          ON t.table_schema = c.table_schema AND t.table_name = c.table_name
        WHERE c.column_name LIKE '%_pb'
          AND c.data_type = 'text'
          AND c.table_schema = 'public'
          AND t.table_type = 'BASE TABLE'
          AND c.table_name LIKE '%_blocks_%'
      LOOP
        EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE "public"."pb" USING %I::"public"."pb"',
          r.table_schema, r.table_name, r.column_name, r.column_name);
      END LOOP;
    END $$;
  `)

  payload.logger.info('Reverted spacing tokens back to old padding enum values')
}
