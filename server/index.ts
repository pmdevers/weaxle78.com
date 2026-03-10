import { join } from 'path'

const API_KEY = process.env.YOUTUBE_API_KEY ?? ''
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? ''
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const STATIC_DIR = process.env.STATIC_DIR ?? join(import.meta.dir, '../dist')

// ─── Static content ──────────────────────────────────────────────────────────

const content = {
  pcSpecs: [
    { label: 'CPU', value: 'AMD Ryzen 5 5600X 6-Core', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { label: 'GPU', value: 'NVIDIA GeForce RTX 5070 Ti', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
    { label: 'RAM', value: '64GB DDR4 3200MHz', icon: 'M12 11V3m0 8v8m0-8H4m8 0h8m-4 8H8a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2z' },
    { label: 'Storage', value: 'WD Black SN850X 4TB NVMe', icon: 'M4 7v10c0 2 1.5 3 3.5 3s3.5-1 3.5-3V7c0-2-1.5-3-3.5-3S4 5 4 7zm0 0c0 2 1.5 3 3.5 3s3.5-1 3.5-3M13 7v10c0 2 1.5 3 3.5 3s3.5-1 3.5-3V7c0-2-1.5-3-3.5-3s-3.5 1-3.5 3zm0 0c0 2 1.5 3 3.5 3s3.5-1 3.5-3' },
    { label: 'Display', value: 'Samsung CRG9 49" Ultrawide Curved', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Case', value: 'Corsair iCUE 5000X RGB', icon: 'M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h14v14H5V5zm2 2v2h2V7H7zm0 4v2h2v-2H7zm0 4v2h2v-2H7z' },
    { label: 'Peripherals', value: 'Corsair K70 & Corsair M65', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' },
    { label: 'Studio Monitors', value: '2× Kali LP-6W V2', icon: 'M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12m-4.536-9.536a5 5 0 000 7.072M3 12a9 9 0 1118 0 9 9 0 01-18 0z' },
    { label: 'Audio Interface', value: 'MOTU M2', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
  ],
  games: [
    { name: 'Sea of Thieves', rank: 'Pirate Legend', image: '/games/Sea of Thieves.webp' },
    { name: 'iRacing', rank: 'Competitive', image: '/games/IRacing.webp' },
    { name: 'Call of Duty', rank: 'Multiplayer', image: '/games/Call of Duty.webp' },
    { name: 'Battlefield', rank: 'Casual / Stream', image: '/games/Battlefield 6.webp' },
  ],
  partners: [
    { name: 'SteelSeries' },
    { name: 'Razer' },
    { name: 'Roccat' },
    { name: 'Gunnar' },
    { name: 'MSI' },
  ],
  heroSlides: [
    { image: '/slider/slider1.png', title: 'ONWARDS TO', highlight: 'GLORY!' },
    { image: '/slider/slider2.png', title: 'RISE TO THE', highlight: 'TOP!' },
    { image: '/slider/slider3.png', title: 'BUILT FOR', highlight: 'CHAMPIONS' },
  ],
}

// Twitch
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

async function handleClips(maxResults: number, origin: string | null): Promise<Response> {
  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    return json({ error: 'Twitch not configured' }, 500, origin)
  }

  const cacheKey = `clips:${maxResults}`
  const cached = getCached(cacheKey)
  if (cached) return json(cached, 200, origin)

  try {
    const token = await getTwitchToken()

    // Resolve broadcaster ID from login
    const userRes = await fetch(
      `https://api.twitch.tv/helix/users?login=${encodeURIComponent(TWITCH_LOGIN)}`,
      { headers: { 'Client-Id': TWITCH_CLIENT_ID, Authorization: `Bearer ${token}` } },
    )
    if (!userRes.ok) throw new Error(`Twitch users error: ${userRes.status}`)
    const userData = await userRes.json()
    const broadcasterId: string = userData.data?.[0]?.id
    if (!broadcasterId) return json({ error: 'Twitch user not found' }, 404, origin)

    // Fetch clips
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

interface CacheEntry {
  data: unknown
  expiresAt: number
}

const cache = new Map<string, CacheEntry>()

function getCached(key: string): unknown | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setCached(key: string, data: unknown): void {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS })
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = process.env.ALLOWED_ORIGIN ?? 'http://localhost:5173'
  return {
    'Access-Control-Allow-Origin': origin === allowed ? origin : allowed,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function json(data: unknown, status = 200, origin: string | null = null): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  })
}

async function handleVideos(maxResults: number, origin: string | null): Promise<Response> {
  if (!API_KEY || !CHANNEL_ID) {
    return json({ error: 'Server not configured' }, 500, origin)
  }

  const cacheKey = `videos:${maxResults}`
  const cached = getCached(cacheKey)
  if (cached) {
    return json(cached, 200, origin)
  }

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

const server = Bun.serve({
  port: Number(process.env.API_PORT ?? 3001),
  async fetch(req: Request) {
    const url = new URL(req.url)
    const origin = req.headers.get('Origin')

    // Preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    if (url.pathname === '/api/content' && req.method === 'GET') {
      return json(content, 200, origin)
    }

    if (url.pathname === '/api/videos' && req.method === 'GET') {
      return handleVideos(5, origin)
    }

    if (url.pathname === '/api/clips' && req.method === 'GET') {
      return handleClips(4, origin)
    }

    if (url.pathname === '/health') {
      return json({ ok: true, cachedKeys: cache.size })
    }

    // Serve static frontend (SPA fallback to index.html)
    const filePath = join(STATIC_DIR, url.pathname)
    const file = Bun.file(filePath)
    if (await file.exists()) {
      return new Response(file)
    }
    return new Response(Bun.file(join(STATIC_DIR, 'index.html')))
  },
})

console.log(`[api] Listening on http://localhost:${server.port}`)
