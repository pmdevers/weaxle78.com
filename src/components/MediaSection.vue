<script setup lang="ts">
import { useYouTubeStore } from '@/stores/youtube'
import { useTwitchStore } from '@/stores/twitch'

const ytStore = useYouTubeStore()
const twitchStore = useTwitchStore()
</script>

<template>
  <section id="media" class="py-24 px-6 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-1 px-4 md:px-0">
        <!-- YouTube -->
        <div class="bg-gaming-card p-12 relative border-l-4 border-l-[#ff0000]">
          <div class="flex items-center justify-between mb-12">
            <div>
              <h3 class="text-4xl font-extrabold text-white uppercase italic tracking-tighter">Latest VODs</h3>
              <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Strategy & Highlights</p>
            </div>
            <div class="text-[#ff0000] opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </div>
          </div>
          <div class="space-y-6">
            <!-- Loading state -->
            <div v-if="ytStore.loading" class="space-y-6">
              <div v-for="n in 3" :key="n" class="flex items-center gap-6 animate-pulse">
                <div class="w-24 h-16 bg-white/10 flex-shrink-0"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-3 bg-white/10 rounded w-3/4"></div>
                  <div class="h-2 bg-white/5 rounded w-1/3"></div>
                </div>
              </div>
            </div>
            <!-- Error state -->
            <p v-else-if="ytStore.error" class="text-xs text-red-400 uppercase tracking-widest">{{ ytStore.error }}</p>
            <!-- Video list -->
            <a
              v-else
              v-for="video in ytStore.videos"
              :key="video.id"
              :href="video.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-6 group"
            >
              <div class="w-24 h-16 bg-white/5 flex-shrink-0 overflow-hidden">
                <img :src="video.thumbnail" :alt="video.title" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div>
                <div class="text-sm font-bold text-white group-hover:text-gaming-primary transition-colors uppercase tracking-tight line-clamp-2">{{ video.title }}</div>
                <div class="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{{ video.publishedAt }}</div>
              </div>
            </a>
          </div>
          <a href="https://www.youtube.com/channel/UCiE_o9tfBY2I-HPp9t_RB4Q" target="_blank" rel="noopener noreferrer" class="mt-12 inline-block text-xs font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors border-b border-white/10 pb-1">Watch All</a>
        </div>

        <!-- Twitch -->
        <div class="bg-gaming-card p-12 relative border-l-4 border-l-gaming-primary">
          <div class="flex items-center justify-between mb-12">
            <div>
              <h3 class="text-4xl font-extrabold text-white uppercase italic tracking-tighter">Live Moments</h3>
              <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Caught live on Twitch</p>
            </div>
            <div class="text-gaming-primary opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.571zm4.715 0h1.714v5.143h-1.714zm-10.286-4.714L2.571 3.428v15.429h4.715v4.286l4.285-4.286h3.429l6.857-6.857V0zm16.286 11.571l-3.429 3.429h-3.857l-3 3v-3H8.143V2.143h14.143z"/>
              </svg>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <!-- Loading -->
            <template v-if="twitchStore.loading">
              <div v-for="n in 4" :key="n" class="aspect-video bg-white/10 animate-pulse"></div>
            </template>
            <!-- Error -->
            <p v-else-if="twitchStore.error" class="col-span-2 text-xs text-red-400 uppercase tracking-widest">{{ twitchStore.error }}</p>
            <!-- Clips -->
            <a
              v-else
              v-for="clip in twitchStore.clips"
              :key="clip.id"
              :href="clip.url"
              target="_blank"
              rel="noopener noreferrer"
              class="aspect-video bg-white/5 overflow-hidden relative group cursor-pointer border border-white/5 hover:border-gaming-primary transition-colors"
            >
              <img :src="clip.thumbnail" :alt="clip.title" class="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
              <div class="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80">
                <span class="text-[10px] font-bold text-white uppercase tracking-tight line-clamp-2">{{ clip.title }}</span>
              </div>
            </a>
          </div>
          <a href="https://twitch.tv/weaxle78" target="_blank" rel="noopener noreferrer" class="mt-12 inline-block text-xs font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors border-b border-white/10 pb-1">Watch All</a>
        </div>
      </div>
    </div>
  </section>
</template>
