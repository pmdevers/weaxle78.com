import { getCached, setCached } from '../lib/cache'
import { json } from '../lib/response'

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID ?? ''
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET ?? ''
const TWITCH_LOGIN = process.env.TWITCH_LOGIN ?? 'weaxle78'

let twitchToken = ''
let twitchTokenExpiry = 0

async function getTwitchToken(): Promise<string> {
  if (twitchToken && Date.now() < twitchTokenExpiry) return twitchToken
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${encodeURIComponent(TWITCH_CLIENT_ID)}&client_secret=${encodeURIComponent(TWITCH_CLIENT_SECRET)}&grant_type=client_credentials`,
    { method: 'POST' },
  )
  if (!res.ok) throw new Error(`Twitch auth error: ${res.status}`)
  const data = await res.json()
  twitchToken = data.access_token
  twitchTokenExpiry = Date.now() + (data.expires_in - 60) * 1000
  return twitchToken
}

export async function handleClips(maxResults: number, origin: string | null): Promise<Response> {
  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    return json({ error: 'Twitch not configured' }, 500, origin)
  }

  const cacheKey = `clips:${maxResults}`
  const cached = getCached(cacheKey)
  if (cached) return json(cached, 200, origin)

  try {
    const token = await getTwitchToken()

    const userRes = await fetch(
      `https://api.twitch.tv/helix/users?login=${encodeURIComponent(TWITCH_LOGIN)}`,
      { headers: { 'Client-Id': TWITCH_CLIENT_ID, Authorization: `Bearer ${token}` } },
    )
    if (!userRes.ok) throw new Error(`Twitch users error: ${userRes.status}`)
    const userData = await userRes.json()
    const broadcasterId: string = userData.data?.[0]?.id
    if (!broadcasterId) return json({ error: 'Twitch user not found' }, 404, origin)

    const clipsRes = await fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=${maxResults}`,
      { headers: { 'Client-Id': TWITCH_CLIENT_ID, Authorization: `Bearer ${token}` } },
    )
    if (!clipsRes.ok) throw new Error(`Twitch clips error: ${clipsRes.status}`)
    const clipsData = await clipsRes.json()

    setCached(cacheKey, clipsData)
    return json(clipsData, 200, origin)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed to load clips'
    return json({ error: msg }, 502, origin)
  }
}
