/**
 * db/seed.ts
 * Creates all tables (if not exists) and upserts seed data.
 * Run with: bun run db:setup
 */
import { blogPosts } from '../server/data/blog-posts'
import { content } from '../server/data/content'

const db = new Bun.SQL(
  process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/weaxle78',
)

// ─── Schema ──────────────────────────────────────────────────────────────────

await db`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id         SERIAL PRIMARY KEY,
    slug       TEXT  UNIQUE NOT NULL,
    title      TEXT  NOT NULL,
    summary    TEXT  NOT NULL,
    category   TEXT  NOT NULL,
    date       DATE  NOT NULL,
    read_time  TEXT  NOT NULL,
    image      TEXT  NOT NULL DEFAULT '',
    content    TEXT  NOT NULL DEFAULT ''
  )
`

await db`
  CREATE TABLE IF NOT EXISTS pc_specs (
    id         SERIAL PRIMARY KEY,
    label      TEXT  NOT NULL,
    value      TEXT  NOT NULL,
    icon       TEXT  NOT NULL DEFAULT '',
    sort_order INT   NOT NULL DEFAULT 0
  )
`

await db`
  CREATE TABLE IF NOT EXISTS games (
    id         SERIAL PRIMARY KEY,
    name       TEXT  NOT NULL,
    rank       TEXT  NOT NULL,
    image      TEXT  NOT NULL DEFAULT '',
    sort_order INT   NOT NULL DEFAULT 0
  )
`

await db`
  CREATE TABLE IF NOT EXISTS partners (
    id         SERIAL PRIMARY KEY,
    name       TEXT  NOT NULL,
    sort_order INT   NOT NULL DEFAULT 0
  )
`

await db`
  CREATE TABLE IF NOT EXISTS hero_slides (
    id         SERIAL PRIMARY KEY,
    image      TEXT  NOT NULL,
    title      TEXT  NOT NULL,
    highlight  TEXT  NOT NULL,
    sort_order INT   NOT NULL DEFAULT 0
  )
`

console.log('[seed] Tables ready')

// ─── Blog Posts ───────────────────────────────────────────────────────────────

for (const post of blogPosts) {
  await db`
    INSERT INTO blog_posts (id, slug, title, summary, category, date, read_time, image, content)
    VALUES (
      ${post.id}, ${post.slug}, ${post.title}, ${post.summary}, ${post.category},
      ${post.date}::date, ${post.readTime}, ${post.image}, ${post.content}
    )
    ON CONFLICT (slug) DO UPDATE SET
      title     = EXCLUDED.title,
      summary   = EXCLUDED.summary,
      category  = EXCLUDED.category,
      date      = EXCLUDED.date,
      read_time = EXCLUDED.read_time,
      image     = EXCLUDED.image,
      content   = EXCLUDED.content
  `
}

// Keep the sequence in sync after explicit ID inserts
await db`SELECT setval('blog_posts_id_seq', (SELECT MAX(id) FROM blog_posts))`

console.log(`[seed] ${blogPosts.length} blog posts`)

// ─── PC Specs ─────────────────────────────────────────────────────────────────

await db`TRUNCATE pc_specs RESTART IDENTITY`
for (let i = 0; i < content.pcSpecs.length; i++) {
  const s = content.pcSpecs[i]
  await db`INSERT INTO pc_specs (label, value, icon, sort_order) VALUES (${s.label}, ${s.value}, ${s.icon}, ${i})`
}
console.log(`[seed] ${content.pcSpecs.length} pc specs`)

// ─── Games ────────────────────────────────────────────────────────────────────

await db`TRUNCATE games RESTART IDENTITY`
for (let i = 0; i < content.games.length; i++) {
  const g = content.games[i]
  await db`INSERT INTO games (name, rank, image, sort_order) VALUES (${g.name}, ${g.rank}, ${g.image}, ${i})`
}
console.log(`[seed] ${content.games.length} games`)

// ─── Partners ─────────────────────────────────────────────────────────────────

await db`TRUNCATE partners RESTART IDENTITY`
for (let i = 0; i < content.partners.length; i++) {
  const p = content.partners[i]
  await db`INSERT INTO partners (name, sort_order) VALUES (${p.name}, ${i})`
}
console.log(`[seed] ${content.partners.length} partners`)

// ─── Hero Slides ──────────────────────────────────────────────────────────────

await db`TRUNCATE hero_slides RESTART IDENTITY`
for (let i = 0; i < content.heroSlides.length; i++) {
  const slide = content.heroSlides[i]
  await db`INSERT INTO hero_slides (image, title, highlight, sort_order) VALUES (${slide.image}, ${slide.title}, ${slide.highlight}, ${i})`
}
console.log(`[seed] ${content.heroSlides.length} hero slides`)

await db.close()
console.log('[seed] Done ✓')
