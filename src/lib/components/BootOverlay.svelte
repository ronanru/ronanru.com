<script lang="ts">
  import { mdiChevronLeft } from "@mdi/js";
  import { onMount, type Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import AboutMeContent from "./AboutMeContent.svelte";
  import Icon from "./Icon.svelte";

  let isBooted = $state(
    /bot|crawler|spider|crawling/.test(navigator.userAgent),
  );
  let isMounted = $state(false);
  let innerWidth = $state(0);
  let isAboutMeOpen = $state(false);

  const {
    children,
  }: {
    children: Snippet;
  } = $props();

  const handleKeydown = (e: KeyboardEvent) => {
    if (!isBooted && e.code === "F2")
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  onMount(() => {
    setTimeout(() => (isMounted = true), 200);
    setTimeout(() => (isBooted = true), 1500);
  });
</script>

<svelte:window onkeydown={handleKeydown} bind:innerWidth />

{#if innerWidth < 800}
  <div class="flex min-h-screen flex-col">
    <div class="text-center bg-red-200 text-red-600 p-2">
      For a full experience, use a desktop browser
    </div>
    <div class="grid place-items-center h-full flex-1 p-8">
      {#if isAboutMeOpen}
        <div class="w-full">
          <button
            onclick={() => (isAboutMeOpen = false)}
            class="flex p-2 items-center">
            <Icon icon={mdiChevronLeft} /> Back
          </button>
        </div>
        <AboutMeContent />
      {:else}
        <div class="space-y-6 w-full">
          <h1 class="text-6xl grid font-bold">
            <span
              class="bg-linear-to-tl from-indigo-800 to-blue-600 bg-clip-text text-transparent"
              >Hi there,</span> I'm Matvey
          </h1>
          <p class="text-2xl">I'm a full-stack web developer.</p>
          <button
            onclick={() => (isAboutMeOpen = true)}
            class="rounded-md bg-blue-600 p-4 text-white hover:bg-blue-700 text-lg">
            About me
          </button>
        </div>
      {/if}
    </div>
  </div>
{:else if isBooted}
  {@render children()}
{:else}
  <div
    out:fade={{ duration: 1000 }}
    class="absolute inset-0 flex h-screen w-screen cursor-wait flex-col justify-between bg-black font-mono text-white">
    <div></div>
    <div class="flex flex-col items-center">
      <div>
        <h1 class="text-2xl">Booting...</h1>
        <div
          class="h-10 w-80 origin-left scale-x-0 bg-white transition-transform duration-1000 ease-linear"
          class:transform-none={isMounted}>
        </div>
      </div>
    </div>
    <div class="flex justify-end p-4">
      <p>Press [F2] for UEFI setting.</p>
    </div>
  </div>
{/if}
