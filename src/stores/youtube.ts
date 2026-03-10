import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  url: string
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 7) return `${days} days ago`
  const weeks = Math.floor(days / 7)
  if (weeks === 1) return '1 week ago'
  if (weeks < 5) return `${weeks} weeks ago`
  const months = Math.floor(days / 30)
  if (months === 1) return '1 month ago'
  return `${months} months ago`
}

interface YouTubeSearchItem {
  id: { videoId: string }
  snippet: {
    title: string
    publishedAt: string
    thumbnails: {
      medium?: { url: string }
      default?: { url: string }
    }
  }
}

export const useYouTubeStore = defineStore('youtube', () => {
  const videos = ref<YouTubeVideo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001'

  async function fetchLatestVideos(maxResults = 5) {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${apiBase}/api/videos?maxResults=${maxResults}`)
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()

      videos.value = (data.items ?? []).map((item: YouTubeSearchItem) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? '',
        publishedAt: timeAgo(item.snippet.publishedAt),
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }))
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load videos'
    } finally {
      loading.value = false
    }
  }

  return { videos, loading, error, fetchLatestVideos }
})
