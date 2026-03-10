<script setup lang="ts">
import TheNavBar from '@/components/TheNavBar.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-gaming-dark font-gaming pb-20 selection:bg-gaming-primary selection:text-white">
    <TheNavBar />
    <RouterView />
    <TheFooter />
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
