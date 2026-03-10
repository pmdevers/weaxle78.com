import { getCached, setCached } from '../lib/cache'
import { json } from '../lib/response'

const API_KEY = process.env.YOUTUBE_API_KEY ?? ''
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? ''

export async function handleVideos(maxResults: number, origin: string | null): Promise<Response> {
  if (!API_KEY || !CHANNEL_ID) {
    return json({ error: 'Server not configured' }, 500, origin)
  }

  const cacheKey = `videos:${maxResults}`
  const cached = getCached(cacheKey)
  if (cached) return json(cached, 200, origin)

  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?key=${encodeURIComponent(API_KEY)}` +
    `&channelId=${encodeURIComponent(CHANNEL_ID)}` +
    `&part=snippet` +
    `&order=date` +
    `&type=video` +
    `&maxResults=${maxResults}`

  const res = await fetch(url)
  if (!res.ok) {
    return json({ error: `YouTube API error: ${res.status}` }, 502, origin)
  }

  const data = await res.json()
  setCached(cacheKey, data)
  return json(data, 200, origin)
}
