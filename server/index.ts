import { join } from 'path'
import { json, corsHeaders } from './lib/response'
import { cacheSize } from './lib/cache'
import { handleContent } from './routes/content'
import { handleBlog, handleBlogPost } from './routes/blog'
import { handleVideos } from './routes/youtube'
import { handleClips } from './routes/twitch'

const STATIC_DIR = process.env.STATIC_DIR ?? join(import.meta.dir, '../dist')
const PUBLIC_DIR = join(import.meta.dir, '../public')

const server = Bun.serve({
  port: Number(process.env.API_PORT ?? 3001),
  async fetch(req: Request) {
    const url = new URL(req.url)
    const origin = req.headers.get('Origin')

    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    if (url.pathname === '/api/content' && req.method === 'GET') {
      return handleContent(origin)
    }

    if (url.pathname === '/api/videos' && req.method === 'GET') {
      return handleVideos(5, origin)
    }

    if (url.pathname === '/api/clips' && req.method === 'GET') {
      return handleClips(4, origin)
    }

    if (url.pathname === '/api/blog' && req.method === 'GET') {
      return handleBlog(url.searchParams, origin)
    }

    const blogSlugMatch = url.pathname.match(/^\/api\/blog\/([\w-]+)$/)
    if (blogSlugMatch && req.method === 'GET') {
      return handleBlogPost(blogSlugMatch[1], origin)
    }

    if (url.pathname === '/health') {
      return json({ ok: true, cachedKeys: cacheSize() })
    }

    // Serve static frontend (SPA fallback to index.html)
    const file = Bun.file(join(STATIC_DIR, url.pathname))
    if (await file.exists()) return new Response(file)

    const publicFile = Bun.file(join(PUBLIC_DIR, url.pathname))
    if (await publicFile.exists()) return new Response(publicFile)

    const indexFile = Bun.file(join(STATIC_DIR, 'index.html'))
    if (await indexFile.exists()) return new Response(indexFile)

    return new Response('Not Found', { status: 404 })
  },
})

console.log(`[api] Listening on http://localhost:${server.port}`)
