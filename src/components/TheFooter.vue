<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function scrollTo(id: string) {
  const go = () => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  if (route.path !== '/') {
    router.push('/').then(() => setTimeout(go, 100))
  } else {
    go()
  }
}
</script>

<template>
  <footer class="bg-black py-20 px-12 border-t border-white/5 text-center">
    <div class="max-w-7xl mx-auto space-y-12">
      <div class="flex items-center justify-center gap-2">
        <img src="/android-chrome-192x192.png" alt="Weaxle78" class="w-12 h-12 object-contain" />
        <span class="text-2xl font-extrabold tracking-tighter text-white uppercase italic">WEAXLE78</span>
      </div>

      <div class="flex flex-wrap justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
        <button @click="scrollTo('home')" class="hover:text-gaming-primary transition-colors">Home</button>
        <button @click="scrollTo('specs')" class="hover:text-gaming-primary transition-colors">Specs</button>
        <button @click="scrollTo('games')" class="hover:text-gaming-primary transition-colors">Games</button>
        <button @click="scrollTo('media')" class="hover:text-gaming-primary transition-colors">Clips</button>
        <RouterLink to="/merch" class="hover:text-gaming-primary transition-colors">Merch</RouterLink>
      </div>

      <div class="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] pt-12">
        &copy; {{ new Date().getFullYear() }} WEAXLE78. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
</template>
