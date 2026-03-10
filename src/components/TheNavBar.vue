<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('home')

const quotes = [
  "It's dangerous to go alone — stream it.",
  "Stay a while and listen… to my stream.",
  "The cake is a lie, but the fun is real.",
  "Get over here — and hit that follow button.",
  "Do a barrel roll… into my channel.",
  "War. War never changes. Neither does my ping.",
  "It's super effective — just like my setup.",
  "You died. Skill issue.",
  "All your base are belong to us.",
  "Press F to pay respects.",
  "The numbers, Mason — they don't lie.",
  "I used to be an adventurer like you, then I took lag to the knee.",
  "Rise and shine, Mr. Freeman — it's stream time.",
  "Had to be me. Someone else might have gotten it wrong.",
  "The world could always use more streamers.",
  "A man chooses. A slave obeys. I choose iRacing.",
  "We're not tools of the government or anyone else. Playing games for fun.",
  "I am inevitable — unless Wi-Fi drops.",
  "You either die a noob or live long enough to see yourself become the sweat.",
  "Not all those who wander are lost — some are just grinding ranked.",
  "Roads? Where we're going we don't need roads. We need good tires in iRacing.",
  "Why so serious? It's just a game.",
  "Every man dies. Not every man really streams.",
  "With great FPS comes great responsibility.",
  "One does not simply walk into Mordor. One queues for it.",
]

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

const sections = ['home', 'specs', 'games', 'media']

function updateActiveSection() {
  const threshold = window.scrollY + window.innerHeight * 0.25
  let current = 'home'
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el && el.offsetTop <= threshold) {
      current = id
    }
  }
  activeSection.value = current
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
    if (route.path === '/') updateActiveSection()
  }, { passive: true })
  updateActiveSection()
})

watch(
  () => route.path,
  (path) => {
    if (path === '/') setTimeout(updateActiveSection, 100)
  }
)

onUnmounted(() => {})

const scrollTo = (id: string) => {
  isMobileMenuOpen.value = false
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

const navClass = (id: string) =>
  route.path === '/' && id === activeSection.value
    ? 'nav-link nav-link-active'
    : 'nav-link'

const routeClass = (path: string) =>
  route.path === path
    ? 'nav-link nav-link-active'
    : 'nav-link'
</script>

<template>
  <!-- Top Utility Bar -->
  <div class="hidden lg:flex justify-between items-center px-12 py-2 bg-black border-b border-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
    <div class="flex items-center gap-6">
      <span>Follow me on:</span>
      <div class="flex items-center gap-4 text-white/70">
        <a href="https://twitch.tv/weaxle78" target="_blank" rel="noopener noreferrer" class="hover:text-gaming-primary transition-colors italic">Twitch</a>
        <a href="https://www.youtube.com/channel/UCiE_o9tfBY2I-HPp9t_RB4Q" target="_blank" rel="noopener noreferrer" class="hover:text-gaming-primary transition-colors italic">YouTube</a>
        <a href="https://x.com/weaxle78" target="_blank" rel="noopener noreferrer" class="hover:text-gaming-primary transition-colors italic">X</a>
        <a href="https://facebook.com/weaxle78" target="_blank" rel="noopener noreferrer" class="hover:text-gaming-primary transition-colors italic">Facebook</a>
      </div>
    </div>
    <div>
      <span class="italic text-white/40 font-medium tracking-normal">"{{ randomQuote }}"</span>
    </div>
  </div>

  <!-- Navigation -->
  <nav
    class="sticky top-0 w-full z-50 transition-all duration-300 px-6 py-4 lg:py-0 lg:px-12 backdrop-blur-xl border-b border-white/5 bg-black/80"
    :class="isScrolled ? 'bg-black/95' : 'lg:bg-black/40'"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between lg:grid lg:grid-cols-[1fr_240px_1fr]">
      <!-- Left nav links -->
      <div class="hidden lg:flex items-center gap-8">
        <div class="flex items-center gap-8">
            <button @click="scrollTo('home')" :class="navClass('home')">Home</button>
            <button @click="scrollTo('specs')" :class="navClass('specs')">Specs</button>
            <button @click="scrollTo('games')" :class="navClass('games')">Games</button>
            <button @click="scrollTo('media')" :class="navClass('media')">Media</button>
        </div>
      </div>

      <!-- Logo -->
      <div class="flex items-center justify-center h-full relative group cursor-pointer" @click="scrollTo('home')">
        <div class="relative w-20 h-20 -mb-4 lg:-mb-6 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_18px_rgba(220,38,38,0.6)]">
          <div class="absolute inset-0 rounded-full bg-gaming-primary/20 blur-md group-hover:bg-gaming-primary/40 transition-colors"></div>
          <img src="/android-chrome-192x192.png" alt="Weaxle78" class="relative w-full h-full object-contain" />
        </div>
      </div>

      <!-- Right Side Nav -->
      <div class="hidden lg:flex items-center justify-end gap-8">
        <RouterLink to="/blog" :class="routeClass('/blog')">Blog</RouterLink>
        <RouterLink to="/merch" :class="routeClass('/merch')">Merch</RouterLink>
        <a href="https://twitch.tv/weaxle78" target="_blank" class="nav-link">Live</a>
      </div>

      <!-- Mobile Brand -->
      <div class="lg:hidden flex items-center gap-3">
        <img src="/android-chrome-192x192.png" alt="Weaxle78" class="w-10 h-10 object-contain" />
        <span class="text-lg font-bold tracking-tighter text-white">WEAXLE78</span>
      </div>

      <!-- Mobile Trigger -->
      <button class="lg:hidden text-white" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/5 py-8 flex flex-col items-center gap-6 shadow-2xl">
        <button @click="scrollTo('specs')" :class="navClass('specs')">Specs</button>
        <button @click="scrollTo('games')" :class="navClass('games')">Games</button>
        <button @click="scrollTo('media')" :class="navClass('media')">Media</button>
        <RouterLink to="/blog" :class="routeClass('/blog')">Blog</RouterLink>
        <RouterLink to="/merch" :class="routeClass('/merch')">Merch</RouterLink>
        <a href="https://twitch.tv/weaxle78" target="_blank" class="btn-gaming">Live Now</a>
      </div>
    </transition>
  </nav>
</template>
