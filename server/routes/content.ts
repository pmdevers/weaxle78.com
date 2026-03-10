import { sql } from '../lib/db'
import { json } from '../lib/response'

export async function handleContent(origin: string | null): Promise<Response> {
  try {
    const [pcSpecs, games, partners, heroSlides] = await Promise.all([
      sql`SELECT label, value, icon FROM pc_specs ORDER BY sort_order`,
      sql`SELECT name, rank, image FROM games ORDER BY sort_order`,
      sql`SELECT name FROM partners ORDER BY sort_order`,
      sql`SELECT image, title, highlight FROM hero_slides ORDER BY sort_order`,
    ])
    return json({ pcSpecs, games, partners, heroSlides }, 200, origin)
  } catch (e) {
    console.error('[content] DB error:', e)
    return json({ error: 'Failed to load content' }, 500, origin)
  }
}
