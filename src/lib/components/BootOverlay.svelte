<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let isBooted = /bot|crawler|spider|crawling/.test(navigator.userAgent),
    isMounted = false,
    innerWidth;

  const handleKeydown = e =>
    !isBooted &&
    e.code === 'F2' &&
    (window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  onMount(() => {
    setTimeout(() => (isMounted = true), 200);
    setTimeout(() => (isBooted = true), 1500);
  });
</script>

<svelte:window on:keydown={handleKeydown} bind:innerWidth />

{#if innerWidth < 1000}
  <p class="fixed inset-0 grid place-items-center p-4 text-center text-xl">
    Sorry, this website doesn't work on mobile.
  </p>
{:else if isBooted}
  <slot />
{:else}
  <div
    out:fade={{ duration: 1000 }}
    class="absolute inset-0 flex h-screen w-screen cursor-wait flex-col justify-between bg-black font-mono text-white">
    <div />
    <div class="flex flex-col items-center">
      <div>
        <h1 class="text-2xl">Booting...</h1>
        <div
          class="h-10 w-80 origin-left scale-x-0 bg-white transition-transform duration-1000 ease-linear"
          class:transform-none={isMounted} />
      </div>
    </div>
    <div class="flex justify-end p-4">
      <p>Press [F2] for UEFI setting.</p>
    </div>
  </div>
{/if}
