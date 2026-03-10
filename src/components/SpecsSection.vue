<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'

const { pcSpecs } = storeToRefs(useContentStore())
</script>

<template>
  <section id="specs" class="py-24 px-6 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-l-4 border-gaming-primary pl-6">
        <div>
          <h2 class="text-5xl font-extrabold text-white tracking-tighter uppercase italic leading-none">The Battlestation</h2>
          <p class="text-slate-500 mt-2 font-medium">High performance hardware specs.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        <div v-for="spec in pcSpecs" :key="spec.label" class="bg-gaming-card p-10 group hover:bg-gaming-primary transition-all duration-500 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-white/5 -rotate-45 translate-x-8 -translate-y-8 group-hover:bg-white/20 transition-colors"></div>
          <div class="relative z-10">
            <div class="w-12 h-12 mb-6 text-gaming-primary group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="spec.icon" />
              </svg>
            </div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-white/70">{{ spec.label }}</div>
            <div class="text-2xl font-extrabold text-white tracking-tighter uppercase italic group-hover:text-white">{{ spec.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
