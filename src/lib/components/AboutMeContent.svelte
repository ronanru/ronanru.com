<script lang="ts">
  import svelteFlipClockImage from '../../assets/projects/svelte-flip-clock.webp';
  import archexplorerImage from '../../assets/projects/archexplorer.webp';
  import myfaqpageImage from '../../assets/projects/myfaqpage.webp';
  import spdonateImage from '../../assets/projects/spdonate.webp';
  import filmanImage from '../../assets/projects/filman.webp';
  import { mdiGithub, mdiTwitter, mdiFileDocument } from '@mdi/js';
  import avatar from '../../assets/avatar.webp';
  import blogIcon from '../../assets/peppo.webp';
  import Icon from './Icon.svelte';
</script>

<div class="mx-auto flex max-w-lg flex-col gap-4">
  <h1 class="text-4xl font-bold mt-8 text-center mb-4">Hello, I'm Matvey! 👋</h1>
  <div class="gap-4 flex-wrap grid grid-cols-3">
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-white border-4 border-black hover:bg-black hover:-translate-y-1 translate-y-0 duration-500 hover:text-white transition-all group text-black shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://github.com/ronanru">
      <div class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiGithub} size={4} />
      </div>
      RonanRU
    </a>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src={avatar}
      class="rounded-3xl hover:shadow-xl border-4 border-black shadow-lg aspect-square hover:-translate-y-1 translate-y-0 duration-500"
      alt="My profile picture" />

    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-[#0088CC] border-4 border-[#0088CC] hover:bg-white hover:text-[#0088CC] duration-500 group transition-all hover:-translate-y-1 translate-y-0 text-white shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://t.me/ryabchikovm">
      <div class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon
          icon="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z"
          size={4} />
      </div>
      @ryabchikovm
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-neutral-900 border-4 border-neutral-900 hover:bg-white hover:text-neutral-900 duration-500 group transition-all hover:-translate-y-1 translate-y-0 text-white shadow-lg aspect-square flex flex-col text-lg justify-center items-center gap-2"
      href="https://blog.ronanru.com">
      <img
        width="112"
        height="112"
        src={blogIcon}
        class="w-20 h-20 rounded-xl group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500"
        alt="Peppo writing in his notepad" />
      My Blog
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-white border-4 border-[#1DA1F2] hover:bg-[#1DA1F2] hover:-translate-y-1 translate-y-0 duration-500 hover:text-white transition-all group text-[#1DA1F2] shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://twitter.com/ryabchikovm">
      <div class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiTwitter} size={4} />
      </div>
      @ryabchikovm
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-indigo-800 border-4 border-indigo-800 hover:bg-white hover:text-indigo-800 duration-500 group transition-all hover:-translate-y-1 translate-y-0 text-white shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://resume.ronanru.com/resume.pdf">
      <div class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiFileDocument} size={4} />
      </div>
      My Resume
    </a>
  </div>
  <h1 class="text-4xl font-bold mt-8 mb-4 text-center">Cool stuff I've built:</h1>
  <div class="flex gap-2">
    <img src={myfaqpageImage} height="270" width="480" class="aspect-video w-48 rounded" alt="" />
    <div>
      <h2 class="text-lg font-bold">
        <a href="https://myfaq.page">My FAQ Page</a>
      </h2>
      <p>
        A web app where anyone can create a beautiful FAQ page in minutes. I used new and trendy T3
        stack for this site: Next.js, TypeScript, tRPC, Prisma.
      </p>
    </div>
  </div>
  <div class="flex gap-2">
    <img
      src={svelteFlipClockImage}
      height="270"
      width="480"
      class="aspect-video w-48 rounded"
      alt="" />
    <div>
      <h2 class="text-lg font-bold">
        <a href="https://svelte-flip-clock.ronanru.dev/">Svelte Flip Clock</a>
      </h2>
      <p>A flip clock component for Svelte (svelte-flip-clock on npm)</p>
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
      <h2 class="text-lg font-bold">
        <a href="https://archexplorer.ronanru.dev">ArchExplorer</a>
      </h2>
      <p>A search engine for Arch Linux packages with minimal client-side JavaScript.</p>
    </div>
  </div>
  <div class="flex gap-2">
    <img src={filmanImage} height="270" width="480" class="aspect-video w-48 rounded" alt="" />
    <div>
      <h2 class="text-lg font-bold">
        <a href="https://github.com/ronanru/filman">Filman</a>
      </h2>
      <p>A TUI file manager for Linux created with Deno and TypeScript with 0 dependencies.</p>
    </div>
  </div>
  <div class="flex gap-2">
    <img src={spdonateImage} height="270" width="480" class="aspect-video w-48 rounded" alt="" />
    <div>
      <h2 class="text-lg font-bold">
        <a href="https://spdonate.ronanru.dev">SPDonate</a>
      </h2>
      <p>A website for streamers to collect donations with real-time alerts.</p>
    </div>
  </div>
</div>
