export interface BlogPost {
  id: number
  slug: string
  title: string
  summary: string
  category: string
  date: string
  readTime: string
  image: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'pirate-legend-journey',
    title: 'How I Finally Became a Pirate Legend',
    summary: "After hundreds of hours sailing the Sea of Thieves, dodging megalodon attacks and losing loot to griefers, I finally hit Pirate Legend. Here's the full story.",
    category: 'Sea of Thieves',
    date: '2026-02-14',
    readTime: '5 min read',
    image: '/games/sea-of-thieves.webp',
    content: `It started on a quiet Tuesday evening. I'd been grinding the Athena's Fortune reputation for weeks — running Athena voyages solo, always nervous about losing the chest at the last second to a sweaty brig crew.\n\nThe final push came after a five-chest run where I nearly lost everything to a kraken off the coast of The Crooked Masts. I survived. I turned in the chests. And then the screen went golden.\n\nPirate Legend.\n\nIf you're chasing it yourself: focus on Athena voyages over regular faction grinding, crew up when you can, and don't let griefers discourage you. The sea is dangerous — that's the point. Embrace the chaos and enjoy every voyage for what it is: a story worth telling.`,
  },
  {
    id: 2,
    slug: 'iracing-setup-tips',
    title: 'iRacing Setup Tips That Actually Work',
    summary: "I've spent way too many hours tweaking setups in iRacing. These are the things I wish someone had told me when I started competitive sim racing.",
    category: 'iRacing',
    date: '2026-02-01',
    readTime: '7 min read',
    image: '/games/iracing.webp',
    content: `iRacing has a steep learning curve — not just for driving, but for setups. When I started out I was copy-pasting setups from Reddit and wondering why I was still spinning off in Turn 1.\n\nHere's what actually helped me:\n\n**Start with the baseline fixed setup.** Before touching anything, learn the track with the default. Understand where you're losing time before blaming the car.\n\n**Tyre pressures matter more than you think.** Cold pressures of around 27-30 PSI (depending on the car) are your friend. Hot pressures should target roughly 32-34 PSI for most GT cars.\n\n**Don't chase oversteer with rear wing.** If the rear is loose under braking, look at brake bias first, not aero. Adding rear wing kills your straight-line speed.\n\n**Dampers are last.** Get the springs, ARBs, and alignment right first. Dampers are a fine-tuning tool, not a fix for fundamental balance issues.\n\nMost importantly: drive consistently. A mediocre setup driven smoothly beats a theoretical perfect setup driven on the limit.`,
  },
  {
    id: 3,
    slug: 'rtx-5070-ti-upgrade',
    title: 'Upgrading to the RTX 5070 Ti — Was It Worth It?',
    summary: 'I swapped out my old GPU for the RTX 5070 Ti. Gaming at ultra settings on a 49" ultrawide has never looked this good. Here\'s my honest take.',
    category: 'Setup',
    date: '2026-01-20',
    readTime: '4 min read',
    image: '/slider/blog-header.png',
    content: `Short answer: yes, absolutely.\n\nI'd been running a previous-gen GPU that was starting to struggle at my native 5120×1440 on the CRG9. Frame drops in Battlefield and stutters in iRacing were becoming genuinely annoying.\n\nThe RTX 5070 Ti changed everything. Ultra settings across the board, DLSS Quality where I want extra headroom, and the whole setup just feels responsive in a way it didn't before.\n\nThe install was painless — pop the old card, slot the new one, update drivers. Done in 20 minutes. The only surprise was how much power it draws, so make sure your PSU is up to the task (I have a 850W and it's comfortable).\n\nIf you're gaming at ultrawide resolution and your GPU is more than two generations old: upgrade. You'll wonder why you waited.`,
  },
  {
    id: 4,
    slug: 'best-battlefield-moments',
    title: 'My Best Battlefield Moments of 2025',
    summary: 'Looking back at the most chaotic, hilarious, and occasionally skillful things that happened during my Battlefield sessions last year.',
    category: 'Battlefield',
    date: '2026-01-05',
    readTime: '3 min read',
    image: '/games/battlefield-6.webp',
    content: `2025 was a good year for Battlefield. Here are some highlights that I'll remember for a while:\n\n**The helicopter save.** A squadmate bailed from a burning helicopter at 200m altitude. I caught him in a transport chopper mid-air. I've never been more proud of a manoeuvre in a video game.\n\n**The 50-kill round.** Playing as support on a large conquest map, I found a ridgeline position with perfect sightlines. Everything just clicked. The squad was communicating, the revives were landing, and I don't think I died once.\n\n**The accidental C4 spectacular.** Intended to blow up a tank. Blew up the tank, two jeeps, a supply crate, and somehow my entire squad. They were not impressed. I was.\n\nBattlefield at its best is pure chaos with just enough structure to feel meaningful. Here's to more moments like these in 2026.`,
  },
  {
    id: 5,
    slug: 'streaming-setup-guide',
    title: 'How I Built My Streaming Setup for Under €500',
    summary: "You don't need to spend thousands to get a solid stream going. Here's exactly what I use and what I'd do differently if starting from scratch.",
    category: 'Streaming',
    date: '2025-12-18',
    readTime: '6 min read',
    image: '/slider/blog-header.png',
    content: `When I started streaming I assumed you needed an expensive capture card, a professional microphone, and a lighting rig. You don't.\n\nHere's the honest breakdown of what I use for audio/streaming gear (excluding the PC itself):\n\n- **MOTU M2** audio interface — €180. Rock-solid drivers, clean preamps, zero latency monitoring.\n- **Kali LP-6W V2 studio monitors** (pair) — €160. Better than any gaming headset I've owned.\n- **A decent dynamic mic** plugged into the MOTU — €80.\n- **OBS Studio** — free. Seriously, just use OBS.\n\nTotal: under €450. The MOTU was the best decision I made — having proper studio monitors means I can actually hear what my stream sounds like, not just what I want to hear.\n\nWhat I'd do differently: I would have skipped the cheap USB microphone phase entirely and gone straight to an audio interface and a proper mic. The quality difference is night and day.`,
  },
  {
    id: 6,
    slug: 'samsung-crg9-review',
    title: 'Living with the Samsung CRG9 Ultrawide for 2 Years',
    summary: "The 49\" ultrawide CRG9 changed how I game. After using it daily for two years — for work and play — here's what I still love and what still annoys me.",
    category: 'Setup',
    date: '2025-12-01',
    readTime: '5 min read',
    image: '/slider/blog-header.png',
    content: `Two years. Roughly 3,000 hours of gaming and probably the same in software development. Here's my honest long-term take on the Samsung CRG9.\n\n**What I still love:**\nThe field of view in iRacing is unmatched. Seeing both mirrors without moving my head makes a real difference. In Sea of Thieves, the 32:9 aspect ratio makes the ocean feel genuinely vast.\n\n**What still annoys me:**\nNot every game supports 5120×1440 properly. Some games stretch the HUD in weird ways or refuse to render at the native resolution. It's gotten better with updates, but check compatibility before you buy.\n\nAlso: the desk footprint is enormous. Make sure you have the depth — the curve brings it quite close.\n\n**Would I buy it again?**\nYes, without hesitation. Once you've gamed on a proper ultrawide, standard 16:9 feels like looking through a letterbox.`,
  },
  {
    id: 7,
    slug: 'cod-ranked-grind',
    title: "The Call of Duty Ranked Grind: A Casual Player's Perspective",
    summary: "I tried ranked in Call of Duty for a month. Here's what happened when a self-described casual jumps into competitive multiplayer.",
    category: 'Call of Duty',
    date: '2025-11-15',
    readTime: '4 min read',
    image: '/games/call-of-duty.webp',
    content: `I want to be clear: I am not a good Call of Duty player. I'm a casual. I play for fun. So deciding to try ranked for a full month was either brave or very stupid.\n\nWeek 1: Placement matches. Got demolished. The movement speed of ranked players felt inhuman.\n\nWeek 2: Started adapting. Slower playstyle, better positioning. Less running in the open. More using cover. Won a few.\n\nWeek 3: Climbed two divisions. Something clicked. I wasn't winning gunfights on mechanics — I was winning them on positioning and game sense.\n\nWeek 4: Hit a hard wall. The players at this rank were clearly more experienced and I ran out of new adaptations to make.\n\nFinal verdict: I'd do it again. Ranked forced me to think about the game properly instead of just reacting. Even if I'll never be a sweatlord, I came out a better player. And I immediately went back to casual after.`,
  },
  {
    id: 8,
    slug: 'why-i-stream',
    title: 'Why I Stream — And Why I Almost Quit',
    summary: "Streaming is harder than it looks. The early days of zero viewers, technical issues, and self-doubt almost made me give up. Here's why I kept going.",
    category: 'Streaming',
    date: '2025-11-02',
    readTime: '8 min read',
    image: '/slider/blog-header.png',
    content: `The first three months of streaming were rough. Zero viewers most nights. Technical problems I didn't understand. A growing feeling that I was shouting into the void.\n\nI almost quit in month two. I'd spent a weekend fixing an audio sync issue, came back Monday, went live, and had exactly zero people watch. I sat there for two hours talking to nobody and seriously considered just... stopping.\n\nSo why didn't I?\n\nHonestly: I realised I was enjoying the process itself. Setting up the scenes, working on the stream layout, learning OBS, improving the audio chain. I liked building the thing, not just using it.\n\nAnd then slowly — very slowly — people started showing up. One regular who came back every stream. Then two. Then a small group who'd chat and make the sessions feel alive.\n\nThat's the thing nobody tells you about small streaming: the community you build at low viewer counts is often tighter and more genuine than anything you'd get at scale. Those early regulars feel like friends.\n\nI stream because I enjoy gaming and I enjoy sharing it. The numbers are secondary. If you're thinking about starting: just start. The void isn't as empty as it looks.`,
  },
]
