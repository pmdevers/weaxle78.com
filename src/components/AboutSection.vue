<template>
  <section class="py-32 px-6 bg-gaming-dark">
    <div class="max-w-6xl mx-auto">
      <!-- Heading -->
      <div class="text-center space-y-4 mb-20">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white uppercase italic tracking-tighter">
          DUTCH <span class="text-gaming-primary">GAMER</span>. ENGINEER. FUN FIRST.
        </h2>
        <div class="w-16 h-1 bg-gaming-primary mx-auto"></div>
      </div>

      <!-- Two-column layout -->
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Left: Bio -->
        <div class="space-y-6 text-slate-400 text-sm font-medium leading-relaxed">
          <p>
            Hey, I'm <span class="text-white font-bold">Weaxle78</span> — a casual streamer and gamer from
            <span class="text-white font-bold">the Netherlands</span>. I game purely for the fun of it: sailing around in
            <span class="text-gaming-primary font-bold">Sea of Thieves</span>, turning laps in
            <span class="text-gaming-primary font-bold">iRacing</span>, and just enjoying whatever the session brings.
          </p>
          <p>
            You'll also find me messing around in
            <span class="text-white font-bold">Call of Duty</span>, blowing things up in
            <span class="text-white font-bold">Battlefield</span>, or having a relaxed kick-about in
            <span class="text-white font-bold">FIFA</span> — no sweat, no stress, just
            <span class="text-gaming-primary font-bold">good vibes and good times</span>.
          </p>
          <p>
            By day I'm a <span class="text-gaming-primary font-bold">Senior C# Software Engineer</span> working on
            finance &amp; banking software. Gaming is how I switch off after work — and the
            <span class="text-white font-bold">battle station</span> makes every session worth sitting down for.
          </p>
          <p class="text-white/30 text-xs uppercase tracking-widest pt-2">
            📍 Netherlands &nbsp;·&nbsp; 🎮 Casual &amp; Chill &nbsp;·&nbsp; 💼 Senior C# Engineer
          </p>
        </div>

        <!-- Right: Platform Profiles -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Steam -->
          <a
            href="https://steamcommunity.com/profiles/76561199047746308/"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gaming-card p-6 border-l-4 border-[#c7d5e0]/30 hover:border-[#66c0f4] transition-all group flex flex-col gap-3"
          >
            <img src="/services/steam.svg" alt="Steam" class="w-9 h-9" />
            <div>
              <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">Steam</div>
              <div class="text-sm font-bold text-white group-hover:text-[#66c0f4] transition-colors">weaxle78</div>
            </div>
          </a>

          <!-- Xbox -->
          <a
            href="https://www.xbox.com/en-US/play/user/weaxle78"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gaming-card p-6 border-l-4 border-[#107C10]/30 hover:border-[#107C10] transition-all group flex flex-col gap-3"
          >
            <img src="/services/xbox.svg" alt="Xbox" class="w-9 h-9" />
            <div>
              <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">Xbox</div>
              <div class="text-sm font-bold text-white group-hover:text-[#107C10] transition-colors">weaxle78</div>
            </div>
          </a>

          <!-- PlayStation -->
          <a
            href="https://my.playstation.com/profile/weaxle78"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gaming-card p-6 border-l-4 border-[#0070d1]/30 hover:border-[#0070d1] transition-all group flex flex-col gap-3"
          >
            <img src="/services/playstation.svg" alt="PlayStation" class="w-9 h-9" />
            <div>
              <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">PlayStation</div>
              <div class="text-sm font-bold text-white group-hover:text-[#0070d1] transition-colors">weaxle78</div>
            </div>
          </a>

          <!-- Nintendo -->
          <a
            href="https://www.nintendo.com"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gaming-card p-6 border-l-4 border-[#E60012]/30 hover:border-[#E60012] transition-all group flex flex-col gap-3"
          >
            <img src="/services/nintendo-switch.svg" alt="Nintendo" class="w-9 h-9" />
            <div>
              <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">Nintendo</div>
              <div class="text-sm font-bold text-white group-hover:text-[#E60012] transition-colors">weaxle78</div>
            </div>
          </a>

          <!-- Battle.net -->
          <a
            href="https://battle.net"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gaming-card p-6 border-l-4 border-[#148EFF]/30 hover:border-[#148EFF] transition-all group flex flex-col gap-3"
          >
            <img src="/services/battlenet.svg" alt="Battle.net" class="w-9 h-9" />
            <div>
              <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">Battle.net</div>
              <div class="text-sm font-bold text-white group-hover:text-[#148EFF] transition-colors">weaxle78#2890</div>
            </div>
          </a>

          <!-- Ubisoft -->
          <a
            href="https://www.ubisoft.com/en-us/playone"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gaming-card p-6 border-l-4 border-[#0070FF]/30 hover:border-[#0070FF] transition-all group flex flex-col gap-3"
          >
            <img src="/services/ubisoft.svg" alt="Ubisoft" class="w-9 h-9" />
            <div>
              <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">Ubisoft</div>
              <div class="text-sm font-bold text-white group-hover:text-[#0070FF] transition-colors">weaxle78</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
