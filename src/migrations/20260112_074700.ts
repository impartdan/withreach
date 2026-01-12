import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // First, convert all old layout values to 'featuredWithList' before schema changes
  await db.execute(sql`
    -- Update all 'basic' layouts to 'featuredWithList'
    UPDATE "header_menu_items" 
    SET "dropdown_layout" = 'featuredWithList' 
    WHERE "dropdown_layout" = 'basic';
    
    -- Update all 'navWithImages' layouts to 'featuredWithList'
    UPDATE "header_menu_items" 
    SET "dropdown_layout" = 'featuredWithList' 
    WHERE "dropdown_layout" = 'navWithImages';
    
    -- Update all 'simpleLinksWithFeature' layouts to 'featuredWithList'
    UPDATE "header_menu_items" 
    SET "dropdown_layout" = 'featuredWithList' 
    WHERE "dropdown_layout" = 'simpleLinksWithFeature';
  `)
  
  payload.logger.info('Migrated old header layout values to featuredWithList')
  
  // Now add the new columns for contentGrid layout (posts instead of cards)
  await db.execute(sql`
    -- Add twoColumnShowcase mode column
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_tcs_mode" AS ENUM('automatic', 'manual');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    -- Add contentGrid mode columns
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_cg_mode1" AS ENUM('automatic', 'manual');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_cg_mode2" AS ENUM('automatic', 'manual');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    -- Add columns for twoColumnShowcase mode
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_tcs_mode" "enum_header_menu_items_dropdown_tcs_mode" DEFAULT 'automatic';
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_tcs_post_id" integer;
    
    -- Add columns for contentGrid with simplified mode
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_cg_mode" AS ENUM('automatic', 'manual');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_cg_mode" "enum_header_menu_items_dropdown_cg_mode" DEFAULT 'automatic';
    
    -- Add foreign key for tcs post relationship
    DO $$ BEGIN
      ALTER TABLE "header_menu_items" ADD CONSTRAINT "header_menu_items_dropdown_tcs_post_id_fk" 
        FOREIGN KEY ("dropdown_tcs_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    -- Create index for tcs post relationship
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_tcs_post_idx" ON "header_menu_items" USING btree ("dropdown_tcs_post_id");
    
    -- Remove title column from content grid items (keeping only link and description)
    ALTER TABLE "header_menu_items_dropdown_cg_items" DROP COLUMN IF EXISTS "title";
  `)
  
  payload.logger.info('Added new columns for contentGrid and twoColumnShowcase layouts')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Remove indexes
    DROP INDEX IF EXISTS "header_menu_items_dropdown_tcs_post_idx";
    
    -- Remove foreign keys
    ALTER TABLE "header_menu_items" DROP CONSTRAINT IF EXISTS "header_menu_items_dropdown_tcs_post_id_fk";
    
    -- Remove columns
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_tcs_mode";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_tcs_post_id";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_cg_mode";
    
    -- Add back title to content grid items
    ALTER TABLE "header_menu_items_dropdown_cg_items" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL DEFAULT '';
  `)
  
  payload.logger.info('Rolled back header layout migration')
}
