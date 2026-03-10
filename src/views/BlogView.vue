<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const blog = useBlogStore()
const route = useRoute()
const router = useRouter()

function getPageParam() {
  return Math.max(1, parseInt(route.query.page as string ?? '1', 10))
}

watch(
  () => route.query.page,
  () => blog.fetchPosts(getPageParam()),
  { immediate: true },
)

function goToPage(p: number) {
  router.push({ query: { ...route.query, page: p } })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="min-h-screen bg-gaming-dark">

    <!-- Hero heading -->
    <div
      class="relative flex items-center justify-center h-64 md:h-80 bg-cover bg-center"
      style="background-image: url('/banners/blog-header.png')"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gaming-dark/70"></div>
      <!-- Content -->
      <div class="relative text-center space-y-4 px-6">
        <h1 class="text-4xl md:text-6xl font-extrabold text-white uppercase italic tracking-tighter drop-shadow-lg">
          THE <span class="text-gaming-primary">BLOG</span>
        </h1>
        <div class="w-16 h-1 bg-gaming-primary mx-auto"></div>
        <p class="text-slate-300 text-sm font-medium drop-shadow">Gaming stories, setup updates &amp; random thoughts.</p>
      </div>
    </div>

    <div class="py-20 px-6">
    <div class="max-w-5xl mx-auto">

      <!-- Loading -->
      <div v-if="blog.loading" class="flex justify-center py-32">
        <div class="w-8 h-8 border-2 border-gaming-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- Error -->
      <div v-else-if="blog.error" class="text-center text-slate-500 text-sm py-32">
        <p>{{ blog.error }}</p>
      </div>

      <!-- Posts grid -->
      <div v-else-if="blog.posts.length" class="grid md:grid-cols-2 gap-6">
        <RouterLink
          v-for="post in blog.posts"
          :key="post.id"
          :to="{ name: 'blog-detail', params: { slug: post.slug } }"
          class="bg-gaming-card border border-white/5 p-6 flex flex-col gap-4 hover:border-gaming-primary/40 transition-colors group"
        >
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase tracking-widest text-gaming-primary">{{ post.category }}</span>
            <span class="text-[10px] text-slate-600 uppercase tracking-widest">{{ post.readTime }}</span>
          </div>
          <h2 class="text-white font-extrabold text-lg leading-snug group-hover:text-gaming-primary transition-colors">
            {{ post.title }}
          </h2>
          <p class="text-slate-400 text-sm leading-relaxed flex-1">{{ post.summary }}</p>
          <div class="text-[11px] text-slate-600 uppercase tracking-widest">{{ formatDate(post.date) }}</div>
        </RouterLink>
      </div>

      <!-- Empty -->
      <div v-else class="text-center text-slate-500 text-sm py-32">
        <p>No posts yet — check back soon!</p>
      </div>

      <!-- Pagination -->
      <div v-if="blog.totalPages > 1" class="flex items-center justify-center gap-3 mt-16">
        <button
          :disabled="blog.page <= 1"
          @click="goToPage(blog.page - 1)"
          class="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-white/10 text-slate-400 hover:border-gaming-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span class="text-xs text-slate-500 uppercase tracking-widest">{{ blog.page }} / {{ blog.totalPages }}</span>
        <button
          :disabled="blog.page >= blog.totalPages"
          @click="goToPage(blog.page + 1)"
          class="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-white/10 text-slate-400 hover:border-gaming-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

    </div>
    </div>
  </div>
</template>
