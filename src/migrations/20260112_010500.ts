import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add new layout enum values
    ALTER TYPE "public"."enum_header_menu_items_dropdown_layout" ADD VALUE IF NOT EXISTS 'featuredWithList';
    ALTER TYPE "public"."enum_header_menu_items_dropdown_layout" ADD VALUE IF NOT EXISTS 'twoColumnShowcase';
    ALTER TYPE "public"."enum_header_menu_items_dropdown_layout" ADD VALUE IF NOT EXISTS 'featuredIntegrations';
    ALTER TYPE "public"."enum_header_menu_items_dropdown_layout" ADD VALUE IF NOT EXISTS 'contentGrid';
    ALTER TYPE "public"."enum_header_menu_items_dropdown_layout" ADD VALUE IF NOT EXISTS 'simpleLinksWithFeature';
    
    -- Create enums for new layout link types
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_fwl_items_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_fwl_card_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_tcs_items_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_tcs_card_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_fi_items_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_fi_integrations_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_cg_items_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_cg_cards_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_slf_links_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_menu_items_dropdown_slf_article_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    -- Add new columns to header_menu_items for featured with list layout
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_fwl_card_heading" varchar;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_fwl_card_call_to_action_text" varchar;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_fwl_card_background_image_id" integer;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_fwl_card_link_type" "enum_header_menu_items_dropdown_fwl_card_link_type";
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_fwl_card_link_new_tab" boolean;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_fwl_card_link_url" varchar;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_fwl_card_link_label" varchar;
    
    -- Add columns for two column showcase layout
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_center_image_id" integer;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_tcs_card_image_id" integer;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_tcs_card_heading" varchar;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_tcs_card_link_type" "enum_header_menu_items_dropdown_tcs_card_link_type";
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_tcs_card_link_new_tab" boolean;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_tcs_card_link_url" varchar;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_tcs_card_link_label" varchar;
    
    -- Add columns for featured integrations layout
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_fi_title" varchar;
    
    -- Add columns for simple links with feature layout
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_slf_article_heading" varchar;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_slf_article_background_image_id" integer;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_slf_article_link_type" "enum_header_menu_items_dropdown_slf_article_link_type";
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_slf_article_link_new_tab" boolean;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_slf_article_link_url" varchar;
    ALTER TABLE "header_menu_items" ADD COLUMN IF NOT EXISTS "dropdown_slf_article_link_label" varchar;
    
    -- Create table for featured with list items
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_fwl_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "link_type" "enum_header_menu_items_dropdown_fwl_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
    
    -- Create table for two column showcase items
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_tcs_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "link_type" "enum_header_menu_items_dropdown_tcs_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
    
    -- Create table for two column showcase card tags
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_tcs_card_tags" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "tag" varchar
    );
    
    -- Create table for featured integrations items
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_fi_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "link_type" "enum_header_menu_items_dropdown_fi_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
    
    -- Create table for featured integrations
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_fi_integrations" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "integration_id" integer,
      "custom_name" varchar,
      "custom_logo_id" integer,
      "link_type" "enum_header_menu_items_dropdown_fi_integrations_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
    
    -- Create table for content grid items
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_cg_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "link_type" "enum_header_menu_items_dropdown_cg_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
    
    -- Create table for content grid cards
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_cg_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "heading" varchar,
      "link_type" "enum_header_menu_items_dropdown_cg_cards_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
    
    -- Create table for content grid card tags
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_cg_cards_tags" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "tag" varchar
    );
    
    -- Create table for simple links with feature
    CREATE TABLE IF NOT EXISTS "header_menu_items_dropdown_slf_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_header_menu_items_dropdown_slf_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
    
    -- Add foreign keys
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_fwl_items" ADD CONSTRAINT "header_menu_items_dropdown_fwl_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_tcs_items" ADD CONSTRAINT "header_menu_items_dropdown_tcs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_tcs_card_tags" ADD CONSTRAINT "header_menu_items_dropdown_tcs_card_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_fi_items" ADD CONSTRAINT "header_menu_items_dropdown_fi_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_fi_integrations" ADD CONSTRAINT "header_menu_items_dropdown_fi_integrations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_fi_integrations" ADD CONSTRAINT "header_menu_items_dropdown_fi_integrations_integration_id_fk" FOREIGN KEY ("integration_id") REFERENCES "public"."integrations"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_cg_items" ADD CONSTRAINT "header_menu_items_dropdown_cg_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_cg_cards" ADD CONSTRAINT "header_menu_items_dropdown_cg_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_cg_cards_tags" ADD CONSTRAINT "header_menu_items_dropdown_cg_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items_dropdown_cg_cards"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
      ALTER TABLE "header_menu_items_dropdown_slf_links" ADD CONSTRAINT "header_menu_items_dropdown_slf_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    -- Create indexes
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_fwl_items_order_idx" ON "header_menu_items_dropdown_fwl_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_fwl_items_parent_id_idx" ON "header_menu_items_dropdown_fwl_items" USING btree ("_parent_id");
    
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_tcs_items_order_idx" ON "header_menu_items_dropdown_tcs_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_tcs_items_parent_id_idx" ON "header_menu_items_dropdown_tcs_items" USING btree ("_parent_id");
    
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_tcs_card_tags_order_idx" ON "header_menu_items_dropdown_tcs_card_tags" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_tcs_card_tags_parent_id_idx" ON "header_menu_items_dropdown_tcs_card_tags" USING btree ("_parent_id");
    
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_fi_items_order_idx" ON "header_menu_items_dropdown_fi_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_fi_items_parent_id_idx" ON "header_menu_items_dropdown_fi_items" USING btree ("_parent_id");
    
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_fi_integrations_order_idx" ON "header_menu_items_dropdown_fi_integrations" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_fi_integrations_parent_id_idx" ON "header_menu_items_dropdown_fi_integrations" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_fi_integrations_integration_idx" ON "header_menu_items_dropdown_fi_integrations" USING btree ("integration_id");
    
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_cg_items_order_idx" ON "header_menu_items_dropdown_cg_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_cg_items_parent_id_idx" ON "header_menu_items_dropdown_cg_items" USING btree ("_parent_id");
    
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_cg_cards_order_idx" ON "header_menu_items_dropdown_cg_cards" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_cg_cards_parent_id_idx" ON "header_menu_items_dropdown_cg_cards" USING btree ("_parent_id");
    
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_cg_cards_tags_order_idx" ON "header_menu_items_dropdown_cg_cards_tags" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_cg_cards_tags_parent_id_idx" ON "header_menu_items_dropdown_cg_cards_tags" USING btree ("_parent_id");
    
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_slf_links_order_idx" ON "header_menu_items_dropdown_slf_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_menu_items_dropdown_slf_links_parent_id_idx" ON "header_menu_items_dropdown_slf_links" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop new tables
    DROP TABLE IF EXISTS "header_menu_items_dropdown_slf_links" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items_dropdown_cg_cards_tags" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items_dropdown_cg_cards" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items_dropdown_cg_items" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items_dropdown_fi_integrations" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items_dropdown_fi_items" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items_dropdown_tcs_card_tags" CASCADE;
    DROP TABLE IF NOT EXISTS "header_menu_items_dropdown_tcs_items" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items_dropdown_fwl_items" CASCADE;
    
    -- Drop new columns from header_menu_items
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_fwl_card_heading";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_fwl_card_call_to_action_text";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_fwl_card_background_image_id";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_fwl_card_link_type";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_fwl_card_link_new_tab";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_fwl_card_link_url";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_fwl_card_link_label";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_center_image_id";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_tcs_card_image_id";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_tcs_card_heading";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_tcs_card_link_type";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_tcs_card_link_new_tab";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_tcs_card_link_url";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_tcs_card_link_label";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_fi_title";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_slf_article_heading";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_slf_article_background_image_id";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_slf_article_link_type";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_slf_article_link_new_tab";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_slf_article_link_url";
    ALTER TABLE "header_menu_items" DROP COLUMN IF EXISTS "dropdown_slf_article_link_label";
    
    -- Note: Cannot drop enum values in PostgreSQL, they would need to be recreated
  `)
}
