import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface PcSpec {
  label: string
  value: string
  icon: string
}

export interface Game {
  name: string
  rank: string
  image: string
}

export interface Partner {
  name: string
}

export interface HeroSlide {
  image: string
  title: string
  highlight: string
}

export const useContentStore = defineStore('content', () => {
  const pcSpecs = ref<PcSpec[]>([])
  const games = ref<Game[]>([])
  const partners = ref<Partner[]>([])
  const heroSlides = ref<HeroSlide[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001'

  async function fetchContent() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${apiBase}/api/content`)
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      pcSpecs.value = data.pcSpecs ?? []
      games.value = data.games ?? []
      partners.value = data.partners ?? []
      heroSlides.value = data.heroSlides ?? []
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load content'
    } finally {
      loading.value = false
    }
  }

  return { pcSpecs, games, partners, heroSlides, loading, error, fetchContent }
})

