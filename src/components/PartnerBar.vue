<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content'

const { partners } = storeToRefs(useContentStore())
</script>

<template>
  <div class="bg-black py-12 px-12 border-y border-white/5">
    <div class="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12 lg:gap-24 grayscale opacity-40 hover:opacity-100 transition-opacity">
      <div v-for="partner in partners" :key="partner.name" class="h-8 flex items-center justify-center">
        <span class="text-xl font-bold tracking-tighter text-white italic opacity-80">{{ partner.name }}</span>
      </div>
    </div>
  </div>
</template>
