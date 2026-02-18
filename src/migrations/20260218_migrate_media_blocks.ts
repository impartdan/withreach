import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Recursively walks a Lexical JSON tree and replaces every `mediaBlock` block
 * node with an `imageBlock` node, mapping `media` → `image`.
 * Returns `true` if any replacement was made.
 */
function migrateMediaBlocks(node: unknown): boolean {
  if (!node || typeof node !== 'object') return false

  let changed = false

  if (Array.isArray(node)) {
    for (const child of node) {
      if (migrateMediaBlocks(child)) changed = true
    }
    return changed
  }

  const obj = node as Record<string, unknown>

  // Handle Lexical block nodes: { type: 'block', fields: { blockType: 'mediaBlock', ... } }
  if (obj.type === 'block' && obj.fields && typeof obj.fields === 'object') {
    const fields = obj.fields as Record<string, unknown>
    if (fields.blockType === 'mediaBlock') {
      fields.blockType = 'imageBlock'
      fields.image = fields.media
      delete fields.media
      // Apply sensible defaults for the new required fields
      if (!fields.maxWidth) fields.maxWidth = 'max-w-4xl'
      if (!fields.alignment) fields.alignment = 'center'
      changed = true
    }
  }

  // Recurse into all object values
  for (const value of Object.values(obj)) {
    if (migrateMediaBlocks(value)) changed = true
  }

  return changed
}

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // ── Published posts ──────────────────────────────────────────────────────
  const publishedPosts = await db.execute(
    sql`SELECT id, content FROM posts WHERE content::text LIKE '%mediaBlock%'`,
  )

  let publishedCount = 0
  for (const row of publishedPosts.rows as { id: number; content: unknown }[]) {
    const content = row.content
    if (migrateMediaBlocks(content)) {
      await db.execute(
        sql`UPDATE posts SET content = ${JSON.stringify(content)}::jsonb WHERE id = ${row.id}`,
      )
      publishedCount++
    }
  }

  payload.logger.info(`Migrated mediaBlock → imageBlock in ${publishedCount} published post(s)`)

  // ── Draft post versions ───────────────────────────────────────────────────
  const draftPosts = await db.execute(
    sql`SELECT id, version_content FROM _posts_v WHERE version_content::text LIKE '%mediaBlock%'`,
  )

  let draftCount = 0
  for (const row of draftPosts.rows as { id: number; version_content: unknown }[]) {
    const content = row.version_content
    if (migrateMediaBlocks(content)) {
      await db.execute(
        sql`UPDATE _posts_v SET version_content = ${JSON.stringify(content)}::jsonb WHERE id = ${row.id}`,
      )
      draftCount++
    }
  }

  payload.logger.info(`Migrated mediaBlock → imageBlock in ${draftCount} draft post version(s)`)
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  // Reverse: imageBlock nodes that were originally mediaBlock (identified by having
  // been given default maxWidth/alignment values) — best-effort rollback.
  function revertImageBlocks(node: unknown): boolean {
    if (!node || typeof node !== 'object') return false
    let changed = false
    if (Array.isArray(node)) {
      for (const child of node) {
        if (revertImageBlocks(child)) changed = true
      }
      return changed
    }
    const obj = node as Record<string, unknown>
    if (obj.type === 'block' && obj.fields && typeof obj.fields === 'object') {
      const fields = obj.fields as Record<string, unknown>
      if (fields.blockType === 'imageBlock' && fields.image != null) {
        fields.blockType = 'mediaBlock'
        fields.media = fields.image
        delete fields.image
        delete fields.maxWidth
        delete fields.alignment
        changed = true
      }
    }
    for (const value of Object.values(obj)) {
      if (revertImageBlocks(value)) changed = true
    }
    return changed
  }

  const publishedPosts = await db.execute(
    sql`SELECT id, content FROM posts WHERE content::text LIKE '%imageBlock%'`,
  )
  for (const row of publishedPosts.rows as { id: number; content: unknown }[]) {
    const content = row.content
    if (revertImageBlocks(content)) {
      await db.execute(
        sql`UPDATE posts SET content = ${JSON.stringify(content)}::jsonb WHERE id = ${row.id}`,
      )
    }
  }

  const draftPosts = await db.execute(
    sql`SELECT id, version_content FROM _posts_v WHERE version_content::text LIKE '%imageBlock%'`,
  )
  for (const row of draftPosts.rows as { id: number; version_content: unknown }[]) {
    const content = row.version_content
    if (revertImageBlocks(content)) {
      await db.execute(
        sql`UPDATE _posts_v SET version_content = ${JSON.stringify(content)}::jsonb WHERE id = ${row.id}`,
      )
    }
  }

  payload.logger.info('Reverted imageBlock → mediaBlock migration')
}
