<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'

const { games } = storeToRefs(useContentStore())
</script>

<template>
  <section id="games" class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-4xl font-extrabold text-white tracking-tighter uppercase italic">Current Titles</h2>
        <div class="w-12 h-1 bg-gaming-primary mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="game in games" :key="game.name" class="relative group cursor-pointer overflow-hidden aspect-[16/9] md:aspect-[3/4]">
          <img :src="game.image" :alt="game.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-gaming-primary/60 transition-colors"></div>
          <div class="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <div class="text-[10px] font-bold text-white/50 group-hover:text-white uppercase tracking-[0.3em] mb-1">{{ game.rank }}</div>
            <h3 class="text-3xl font-extrabold text-white uppercase italic tracking-tighter">{{ game.name }}</h3>
            <div class="h-1 w-0 group-hover:w-full bg-white transition-all duration-500 mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
