import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface BlogPost {
  id: number
  slug: string
  title: string
  summary: string
  category: string
  date: string
  readTime: string
  image?: string
  content?: string
}

export interface BlogPage {
  posts: BlogPost[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const total = ref(0)
  const page = ref(1)
  const totalPages = ref(1)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPost = ref<BlogPost | null>(null)
  const postLoading = ref(false)
  const postError = ref<string | null>(null)

  const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001'

  async function fetchPosts(p = 1, limit = 6) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${apiBase}/api/blog?page=${p}&limit=${limit}`)
      if (!res.ok) throw new Error(`Failed to load blog posts: ${res.status}`)
      const data: BlogPage = await res.json()
      posts.value = data.posts
      total.value = data.total
      page.value = data.page
      totalPages.value = data.totalPages
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function fetchPost(slug: string) {
    postLoading.value = true
    postError.value = null
    currentPost.value = null
    try {
      const res = await fetch(`${apiBase}/api/blog/${encodeURIComponent(slug)}`)
      if (!res.ok) throw new Error(`Post not found`)
      currentPost.value = await res.json()
    } catch (e) {
      postError.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      postLoading.value = false
    }
  }

  return { posts, total, page, totalPages, loading, error, currentPost, postLoading, postError, fetchPosts, fetchPost }
})
