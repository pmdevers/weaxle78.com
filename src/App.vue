<script setup lang="ts">
import { onMounted } from 'vue'
import { useContentStore } from '@/stores/content'
import { useYouTubeStore } from '@/stores/youtube'
import { useTwitchStore } from '@/stores/twitch'
import TheNavBar from '@/components/TheNavBar.vue'
import HeroSlider from '@/components/HeroSlider.vue'
import PartnerBar from '@/components/PartnerBar.vue'
import AboutSection from '@/components/AboutSection.vue'
import SpecsSection from '@/components/SpecsSection.vue'
import GamesSection from '@/components/GamesSection.vue'
import MediaSection from '@/components/MediaSection.vue'
import CallToAction from '@/components/CallToAction.vue'
import TheFooter from '@/components/TheFooter.vue'

const store = useContentStore()
const ytStore = useYouTubeStore()
const twitchStore = useTwitchStore()

onMounted(() => {
  store.fetchContent()
  ytStore.fetchLatestVideos(5)
  twitchStore.fetchClips(4)
})
</script>

<template>
  <div class="min-h-screen bg-gaming-dark font-gaming pb-20 selection:bg-gaming-primary selection:text-white">
    <TheNavBar />
    <div class="overflow-hidden">
      <HeroSlider />
      <PartnerBar />
      <AboutSection />
      <SpecsSection />
      <GamesSection />
      <MediaSection />
      <CallToAction />
      <TheFooter />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Teko:wght@400;500;600;700&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  overflow-x: hidden;
  background-color: #0e0e0e;
}

.font-gaming {
  font-family: 'Rajdhani', sans-serif;
}

.font-teko {
  font-family: 'Teko', sans-serif;
}
</style>
