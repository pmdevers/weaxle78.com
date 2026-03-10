<template>
  <footer class="bg-black py-20 px-12 border-t border-white/5 text-center">
    <div class="max-w-7xl mx-auto space-y-12">
      <div class="flex items-center justify-center gap-2">
        <div class="w-12 h-12 bg-white flex items-center justify-center">
          <span class="text-black font-extrabold text-2xl tracking-tighter italic">W</span>
        </div>
        <span class="text-2xl font-extrabold tracking-tighter text-white uppercase italic">WEAXLE78</span>
      </div>

      <div class="flex flex-wrap justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
        <a href="#home" class="hover:text-gaming-primary transition-colors">Home</a>
        <a href="#specs" class="hover:text-gaming-primary transition-colors">Specs</a>
        <a href="#games" class="hover:text-gaming-primary transition-colors">Games</a>
        <a href="#media" class="hover:text-gaming-primary transition-colors">Clips</a>
        <a href="#" class="hover:text-gaming-primary transition-colors">Merch</a>
      </div>

      <div class="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] pt-12">
        &copy; {{ new Date().getFullYear() }} WEAXLE78. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
</template>
