<script setup lang="ts">
import { onMounted } from 'vue'
import { useContentStore } from '@/stores/content'
import { useYouTubeStore } from '@/stores/youtube'
import { useTwitchStore } from '@/stores/twitch'
import HeroSlider from '@/components/HeroSlider.vue'
import PartnerBar from '@/components/PartnerBar.vue'
import AboutSection from '@/components/AboutSection.vue'
import SpecsSection from '@/components/SpecsSection.vue'
import GamesSection from '@/components/GamesSection.vue'
import MediaSection from '@/components/MediaSection.vue'
import CallToAction from '@/components/CallToAction.vue'

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
  <div class="overflow-hidden">
    <HeroSlider />
    <PartnerBar />
    <AboutSection />
    <SpecsSection />
    <GamesSection />
    <MediaSection />
    <CallToAction />
  </div>
</template>
