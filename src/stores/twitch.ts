import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TwitchClip {
  id: string
  title: string
  thumbnail: string
  url: string
  viewCount: number
  createdAt: string
}

interface TwitchClipItem {
  id: string
  title: string
  thumbnail_url: string
  url: string
  view_count: number
  created_at: string
}

export const useTwitchStore = defineStore('twitch', () => {
  const clips = ref<TwitchClip[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001'

  async function fetchClips(maxResults = 4) {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${apiBase}/api/clips?maxResults=${maxResults}`)
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()

      clips.value = (data.data ?? []).map((item: TwitchClipItem) => ({
        id: item.id,
        title: item.title,
        // Replace %{width}x%{height} template in Twitch thumbnail URL
        thumbnail: item.thumbnail_url.replace('%{width}', '480').replace('%{height}', '272'),
        url: item.url,
        viewCount: item.view_count,
        createdAt: item.created_at,
      }))
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load clips'
    } finally {
      loading.value = false
    }
  }

  return { clips, loading, error, fetchClips }
})
