<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useContentStore } from '@/stores/content'

const store = useContentStore()
const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval>

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % store.heroSlides.length
}
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + store.heroSlides.length) % store.heroSlides.length
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(slideInterval)
})

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="home" class="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
    <!-- Slide backgrounds -->
    <div
      v-for="(slide, i) in store.heroSlides"
      :key="i"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="i === currentSlide ? 'opacity-100' : 'opacity-0'"
    >
      <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-gaming-dark via-gaming-dark/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gaming-primary/10 mix-blend-color"></div>
    </div>

    <!-- Slide content -->
    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <transition
        enter-active-class="transition duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
        mode="out-in"
      >
        <h1 :key="currentSlide" class="text-7xl md:text-[140px] font-extrabold text-white tracking-tighter leading-[0.85] font-teko uppercase italic mb-8 drop-shadow-2xl">
          {{ store.heroSlides[currentSlide]?.title }}<br/>
          <span class="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{{ store.heroSlides[currentSlide]?.highlight }}</span>
        </h1>
      </transition>
      <div class="flex flex-col items-center gap-6">
        <button @click="scrollTo('specs')" class="btn-gaming !px-12 !py-4 !text-base">View Setup</button>
        <div class="flex items-center gap-2 group cursor-pointer text-xs font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">
          <span>Scroll for more</span>
          <div class="w-[1px] h-12 bg-white/20 group-hover:bg-gaming-primary transition-colors mt-2"></div>
        </div>
      </div>
    </div>

    <!-- Dot indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
      <button
        v-for="(_, i) in store.heroSlides"
        :key="i"
        @click="currentSlide = i"
        class="h-2 rounded-full transition-all duration-300"
        :class="i === currentSlide ? 'w-8 bg-gaming-primary' : 'w-2 bg-white/30 hover:bg-white/60'"
      ></button>
    </div>

    <!-- Arrow Controls -->
    <button @click="prevSlide" class="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors hidden xl:block">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button @click="nextSlide" class="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors hidden xl:block">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </section>
</template>
