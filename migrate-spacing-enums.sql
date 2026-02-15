-- Migration: Update padding enum values from old names to new spacing token names
-- Run with: psql "$DATABASE_URI" -f migrate-spacing-enums.sql

BEGIN;

DO $$
DECLARE
  r RECORD;
BEGIN
  -- Step 1: Drop ALL default values that reference the pt or pb enum types
  -- (this catches text columns whose defaults still cast to ::pt or ::pb)
  FOR r IN
    SELECT c.table_schema, c.table_name, c.column_name
    FROM information_schema.columns c
    JOIN pg_attrdef d
      ON d.adrelid = (c.table_schema || '.' || c.table_name)::regclass
      AND d.adnum = c.ordinal_position
    WHERE c.table_schema = 'public'
      AND (pg_get_expr(d.adbin, d.adrelid) LIKE '%::pt%'
        OR pg_get_expr(d.adbin, d.adrelid) LIKE '%::pb%')
  LOOP
    EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I DROP DEFAULT',
      r.table_schema, r.table_name, r.column_name);
    RAISE NOTICE 'Dropped default: %.%', r.table_name, r.column_name;
  END LOOP;

  -- Step 2: Convert any remaining enum-typed columns (pt/pb) to text
  FOR r IN
    SELECT c.table_schema, c.table_name, c.column_name
    FROM information_schema.columns c
    WHERE c.udt_name IN ('pt', 'pb') AND c.table_schema = 'public'
  LOOP
    EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I TYPE text USING %I::text',
      r.table_schema, r.table_name, r.column_name, r.column_name);
    RAISE NOTICE 'Converted to text: %.%', r.table_name, r.column_name;
  END LOOP;

  -- Step 3: Update old values to new spacing tokens in ALL padding columns
  FOR r IN
    SELECT c.table_schema, c.table_name, c.column_name
    FROM information_schema.columns c
    WHERE c.column_name LIKE '%padding%'
      AND c.table_schema = 'public'
      AND c.data_type = 'text'
  LOOP
    EXECUTE format($q$
      UPDATE %I.%I SET %I = CASE %I
        WHEN 'small' THEN 'sm'
        WHEN 'medium' THEN 'md'
        WHEN 'large' THEN 'lg'
        WHEN 'xlarge' THEN 'xl'
        ELSE %I
      END WHERE %I IN ('small', 'medium', 'large', 'xlarge')
    $q$, r.table_schema, r.table_name, r.column_name, r.column_name, r.column_name, r.column_name);
    RAISE NOTICE 'Updated values: %.%', r.table_name, r.column_name;
  END LOOP;
END $$;

-- Step 4: Drop old enum types (no more dependents)
DROP TYPE IF EXISTS "public"."pt";
DROP TYPE IF EXISTS "public"."pb";

-- Payload's pushDevSchema will recreate enum types, defaults, and column types on next startup.

COMMIT;
