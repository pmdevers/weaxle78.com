import { sql } from '../lib/db'
import { json } from '../lib/response'

export async function handleBlog(
  searchParams: URLSearchParams,
  origin: string | null,
): Promise<Response> {
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') ?? '6', 10)))
  const offset = (page - 1) * limit

  try {
    const [countRows, posts] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM blog_posts`,
      sql`
        SELECT id, slug, title, summary, category,
               to_char(date, 'YYYY-MM-DD') AS date,
               read_time AS "readTime", image
        FROM   blog_posts
        ORDER  BY date DESC
        LIMIT  ${limit} OFFSET ${offset}
      `,
    ])
    const total = (countRows[0] as { count: number }).count
    return json({ posts, total, page, limit, totalPages: Math.ceil(total / limit) }, 200, origin)
  } catch (e) {
    console.error('[blog] DB error:', e)
    return json({ error: 'Failed to load posts' }, 500, origin)
  }
}

export async function handleBlogPost(
  slug: string,
  origin: string | null,
): Promise<Response> {
  try {
    const rows = await sql`
      SELECT id, slug, title, summary, category,
             to_char(date, 'YYYY-MM-DD') AS date,
             read_time AS "readTime", image, content
      FROM   blog_posts
      WHERE  slug = ${slug}
      LIMIT  1
    `
    if (!rows.length) return json({ error: 'Not found' }, 404, origin)
    return json(rows[0], 200, origin)
  } catch (e) {
    console.error('[blog] DB error:', e)
    return json({ error: 'Failed to load post' }, 500, origin)
  }
}
