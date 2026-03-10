<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const blog = useBlogStore()

watch(
  () => route.params.slug,
  (slug) => { if (slug) blog.fetchPost(slug as string) },
  { immediate: true },
)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Render plain content: double newlines become paragraph breaks, **bold** becomes <strong>
const renderedContent = computed(() => {
  if (!blog.currentPost?.content) return ''
  return blog.currentPost.content
    .split(/\n\n+/)
    .map((para) => {
      const html = para.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
      return `<p class="text-slate-400 text-sm leading-relaxed">${html}</p>`
    })
    .join('')
})
</script>

<template>

  <div class="min-h-screen bg-gaming-dark">

    <!-- Hero header -->
    <div
      class="relative flex items-end h-64 md:h-96 bg-cover bg-center"
      :style="{ backgroundImage: `url('${blog.currentPost?.image || '/slider/blog-header.png'}')` }"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-gaming-dark via-gaming-dark/60 to-black/40"></div>
      <div class="relative w-full max-w-2xl mx-auto px-6 pb-10">
        <template v-if="blog.currentPost">
          <div class="flex items-center gap-4 mb-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-gaming-primary">{{ blog.currentPost.category }}</span>
            <span class="text-[10px] text-slate-400 uppercase tracking-widest">{{ blog.currentPost.readTime }}</span>
            <span class="text-[10px] text-slate-400 uppercase tracking-widest">{{ formatDate(blog.currentPost.date) }}</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-white uppercase italic tracking-tighter leading-tight drop-shadow-lg">
            {{ blog.currentPost.title }}
          </h1>
        </template>
      </div>
    </div>

    <div class="px-6 py-12">
    <div class="max-w-2xl mx-auto">

      <!-- Back -->
      <RouterLink to="/blog" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-gaming-primary transition-colors mb-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </RouterLink>

      <!-- Loading -->
      <div v-if="blog.postLoading" class="flex justify-center py-32">
        <div class="w-8 h-8 border-2 border-gaming-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- Error -->
      <div v-else-if="blog.postError" class="text-center text-slate-500 text-sm py-32">
        <p>{{ blog.postError }}</p>
      </div>

      <!-- Post -->
      <article v-else-if="blog.currentPost">
        <!-- Divider -->
        <div class="w-16 h-1 bg-gaming-primary mb-10"></div>

        <!-- Summary -->
        <p class="text-slate-300 text-base font-medium leading-relaxed mb-8 border-l-4 border-gaming-primary/50 pl-4">
          {{ blog.currentPost.summary }}
        </p>

        <!-- Content -->
        <div class="space-y-4" v-html="renderedContent"></div>
      </article>

    </div>
    </div>
  </div>
</template>
