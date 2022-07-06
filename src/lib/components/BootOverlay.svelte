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
  <p class="fixed inset-0 grid place-items-center text-xl text-center p-4">
    Sorry, this website doesn't work on mobile.
  </p>
{:else if isBooted}
  <slot />
{:else}
  <div
    out:fade={{ duration: 1000 }}
    class="h-screen w-screen bg-black absolute inset-0 text-white flex flex-col justify-between font-mono cursor-wait"
  >
    <div />
    <div class="flex flex-col items-center">
      <div>
        <h1 class="text-2xl">Booting...</h1>
        <div
          class="w-80 transition-transform h-10 bg-white duration-1000 scale-x-0 origin-left ease-linear"
          class:transform-none={isMounted}
        />
      </div>
    </div>
    <div class="flex justify-end p-4">
      <p>Press [F2] for UEFI setting.</p>
    </div>
  </div>
{/if}
