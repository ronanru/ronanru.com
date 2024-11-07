<script lang="ts">
  import { mdiGithub, mdiTwitter, mdiFileDocument } from "@mdi/js";
  import avatar from "../../assets/avatar.webp";
  import blogIcon from "../../assets/peppo.webp";
  import Icon from "./Icon.svelte";
</script>

<div class="mx-auto flex max-w-lg flex-col gap-4">
  <h1 class="text-4xl font-bold mt-8 text-center mb-4">Hey, I'm Matvey! 👋</h1>
  <div
    class="gap-4 flex-wrap grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))]">
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-white border-4 border-black hover:bg-black hover:-translate-y-1 translate-y-0 duration-500 hover:text-white transition-all group text-black shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://github.com/ronanru">
      <div
        class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiGithub} size={4} />
      </div>
      RonanRU
    </a>
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img
      src={avatar}
      class="rounded-3xl hover:shadow-xl border-4 border-black shadow-lg aspect-square hover:-translate-y-1 translate-y-0 duration-500"
      alt="My profile picture" />
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-[#0088CC] border-4 border-[#0088CC] hover:bg-white hover:text-[#0088CC] duration-500 group transition-all hover:-translate-y-1 translate-y-0 text-white shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://t.me/matvey_dev">
      <div
        class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon
          icon="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z"
          size={4} />
      </div>
      @matvey_dev
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
      class="rounded-3xl hover:shadow-xl bg-white border-4 border-[#0085ff] hover:bg-[#0085ff] hover:-translate-y-1 translate-y-0 duration-500 hover:text-white transition-all group text-[#0085ff] shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://bsky.app/profile/matvey.dev">
      <div
        class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <svg fill="none" viewBox="0 0 64 57" width="80" height="80"
          ><path
            fill="currentColor"
            d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
          ></path
          ></svg>
      </div>
      @matvey.dev
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-3xl hover:shadow-xl bg-indigo-800 border-4 border-indigo-800 hover:bg-white hover:text-indigo-800 duration-500 group transition-all hover:-translate-y-1 translate-y-0 text-white shadow-lg aspect-square flex flex-col text-lg justify-center items-center"
      href="https://resume.ronanru.com/resume.pdf">
      <div
        class="group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
        <Icon icon={mdiFileDocument} size={4} />
      </div>
      My Resume
    </a>
  </div>
  <h1 class="text-4xl font-bold mt-8 mb-4 text-center">
    Cool stuff I've built:
  </h1>
  <p>
    I don't want to update this list anymore, just find my stuff on <a
      href="https://github.com/ronanru"
      target="_blank"
      rel="noopener noreferrer">GitHub</a
    >.
  </p>
</div>
