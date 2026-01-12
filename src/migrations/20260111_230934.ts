import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Drop old header_nav_items table and enum
    DROP TABLE IF EXISTS "header_nav_items" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_header_nav_items_link_type";
    
    -- Create new enums for menu items
    CREATE TYPE "public"."enum_header_menu_items_type" AS ENUM('link', 'dropdown');
    CREATE TYPE "public"."enum_header_menu_items_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_header_menu_items_dropdown_layout" AS ENUM('basic', 'navWithImages');
    CREATE TYPE "public"."enum_header_menu_items_dropdown_basic_links_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_header_menu_items_dropdown_nav_with_images_links_link_type" AS ENUM('reference', 'custom');
    
    -- Create new header_menu_items table
    CREATE TABLE "header_menu_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "type" "enum_header_menu_items_type" DEFAULT 'link',
      "link_type" "enum_header_menu_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "dropdown_label" varchar,
      "dropdown_layout" "enum_header_menu_items_dropdown_layout" DEFAULT 'basic'
    );
    
    -- Create child links table for dropdown
    CREATE TABLE "header_menu_items_dropdown_child_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_header_menu_items_dropdown_basic_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
    
    -- Create nav with images links table for dropdown
    CREATE TABLE "header_menu_items_dropdown_nav_with_images_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_header_menu_items_dropdown_nav_with_images_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "image_id" integer
    );
    
    -- Add foreign keys
    ALTER TABLE "header_menu_items" ADD CONSTRAINT "header_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "header_menu_items_dropdown_child_links" ADD CONSTRAINT "header_menu_items_dropdown_child_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "header_menu_items_dropdown_nav_with_images_links" ADD CONSTRAINT "header_menu_items_dropdown_nav_with_images_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "header_menu_items_dropdown_nav_with_images_links" ADD CONSTRAINT "header_menu_items_dropdown_nav_with_images_links_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    
    -- Create indexes
    CREATE INDEX "header_menu_items_order_idx" ON "header_menu_items" USING btree ("_order");
    CREATE INDEX "header_menu_items_parent_id_idx" ON "header_menu_items" USING btree ("_parent_id");
    CREATE INDEX "header_menu_items_dropdown_child_links_order_idx" ON "header_menu_items_dropdown_child_links" USING btree ("_order");
    CREATE INDEX "header_menu_items_dropdown_child_links_parent_id_idx" ON "header_menu_items_dropdown_child_links" USING btree ("_parent_id");
    CREATE INDEX "header_menu_items_dropdown_nav_with_images_links_order_idx" ON "header_menu_items_dropdown_nav_with_images_links" USING btree ("_order");
    CREATE INDEX "header_menu_items_dropdown_nav_with_images_links_parent_id_idx" ON "header_menu_items_dropdown_nav_with_images_links" USING btree ("_parent_id");
    CREATE INDEX "header_menu_items_dropdown_nav_with_images_links_image_idx" ON "header_menu_items_dropdown_nav_with_images_links" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop new tables
    DROP TABLE IF EXISTS "header_menu_items_dropdown_nav_with_images_links" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items_dropdown_child_links" CASCADE;
    DROP TABLE IF EXISTS "header_menu_items" CASCADE;
    
    -- Drop new enums
    DROP TYPE IF EXISTS "public"."enum_header_menu_items_dropdown_nav_with_images_links_link_type";
    DROP TYPE IF EXISTS "public"."enum_header_menu_items_dropdown_basic_links_link_type";
    DROP TYPE IF EXISTS "public"."enum_header_menu_items_dropdown_layout";
    DROP TYPE IF EXISTS "public"."enum_header_menu_items_link_type";
    DROP TYPE IF EXISTS "public"."enum_header_menu_items_type";
    
    -- Recreate old header_nav_items table
    CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
    CREATE TABLE "header_nav_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL
    );
    ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
    CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  `)
}
