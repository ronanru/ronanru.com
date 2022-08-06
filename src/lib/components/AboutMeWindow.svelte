<script lang="ts">
  import archexplorerImage from '../../assets/projects/archexplorer.webp';
  import spworldsImage from '../../assets/projects/spworlds.webp';
  import spdonateImage from '../../assets/projects/spdonate.webp';
  import filmanImage from '../../assets/projects/filman.webp';
  import { mdiEmail, mdiDiscord, mdiGithub } from '@mdi/js';
  import icon from '../../assets/icons/about-me.svg';
  import { createEventDispatcher } from 'svelte';
  import avatar from '../../assets/avatar.webp';
  import BaseWindow from './BaseWindow.svelte';
  import Icon from './Icon.svelte';

  const dispatch = createEventDispatcher();

  export let isOpen: boolean;
</script>

<BaseWindow
  title="About Me"
  {icon}
  height={900}
  width={700}
  bind:isOpen
  on:close={() => dispatch('close')}
  on:mousedown={() => dispatch('mousedown')}>
  <div class="mx-auto flex max-w-lg flex-col gap-4">
    <div class="mt-8 flex gap-4">
      <img
        src={avatar}
        class="float-left h-56 w-56 rounded-3xl border border-black shadow-lg"
        alt="" />
      <div class="space-y-2">
        <h1 class="text-2xl font-bold">Hello, I'm Matvey!</h1>

        <a class="flex items-center gap-2" href="https://github.com/ronanru">
          <Icon icon={mdiGithub} />
          RonanRU
        </a>
        <button
          class="flex items-center gap-2 text-[#5865F2]"
          on:click={() => navigator.clipboard.writeText('Ronan#2587')}>
          <Icon icon={mdiDiscord} />
          Ronan#2587
        </button>
        <a class="flex items-center gap-2 text-[#0088CC]" href="https://t.me/ryabchikovm">
          <Icon
            icon="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
          @ryabchikovm
        </a>
        <a class="flex items-center gap-2 text-orange-600" href="mailto:ronanru@duck.com">
          <Icon icon={mdiEmail} />
          ronanru@duck.com
        </a>
      </div>
    </div>
    <p>
      I'm a young and aspiring full-stack web developer from Russia 🇷🇺, with 4+ years of experience
      with the newest web technologies and standards. In every project I like to focus my attention
      on speed and security, making sure every page loads as fast as possible and every attack
      vector is accounted for.
    </p>
    <h1 class="text-2xl font-bold">My Skills</h1>
    <p>Programming Languages: JavaScript, TypeScript, Python, Java, Bash.</p>
    <p>Frontend: Svelte, SvelteKit, React, Preact, Fresh, Next.js, Vue, Nuxt.js, Electron.</p>
    <p>Backend: node.js, deno.</p>
    <p>Databases: PostgreSQL, MySQL, MondoDB, Firebase Firestore, redis.</p>
    <p>Other Technologies: Docker, git, vim.</p>
    <p>Non technical: Video editing, Image editing.</p>
    <p>Languages: English, Russian.</p>
    <h1 class="text-2xl font-bold">My other projects</h1>
    <div class="flex gap-2">
      <img src={spworldsImage} height="270" width="480" class="aspect-video w-48 rounded" alt="" />
      <div>
        <h2 class="text-xl font-bold">
          <a href="https://spworlds.ru">SPWorlds</a>
          <span
            class="rounded-full border-2 border-green-800 p-1 text-sm font-normal text-green-800">
            Backend
          </span>
          <span
            class="rounded-full border-2 border-purple-800 p-1 text-sm font-normal text-purple-800">
            Frontend
          </span>
        </h2>
        <p>
          A website for a minecraft server network with payments and social media functionality. The
          site is installable PWA.
        </p>
      </div>
    </div>
    <div class="flex gap-2">
      <img
        src={archexplorerImage}
        height="270"
        width="480"
        class="aspect-video w-48 rounded"
        alt="" />
      <div>
        <h2 class="text-xl font-bold">
          <a href="https://archexplorer.ronanru.dev">ArchExplorer</a>
          <span
            class="rounded-full border-2 border-green-800 p-1 text-sm font-normal text-green-800">
            Backend
          </span>
          <span
            class="rounded-full border-2 border-purple-800 p-1 text-sm font-normal text-purple-800">
            Frontend
          </span>
        </h2>
        <p>A search engine for Arch Linux packages with minimal client-side JavaScript.</p>
      </div>
    </div>
    <div class="flex gap-2">
      <img src={filmanImage} height="270" width="480" class="aspect-video w-48 rounded" alt="" />
      <div>
        <h2 class="text-xl font-bold">
          <a href="https://github.com/ronanru/filman">Filman</a>
        </h2>
        <p>A TUI file manager for Linux created with Deno and TypeScript with 0 dependencies.</p>
      </div>
    </div>
    <div class="flex gap-2">
      <img src={spdonateImage} height="270" width="480" class="aspect-video w-48 rounded" alt="" />
      <div>
        <h2 class="text-xl font-bold">
          <a href="https://spdonate.ronanru.dev">SPDonate</a>
          <span
            class="rounded-full border-2 border-green-800 p-1 text-sm font-normal text-green-800">
            Backend
          </span>
        </h2>
        <p>A website for streamers to collect donations with real-time alerts.</p>
      </div>
    </div>
  </div>
</BaseWindow>
