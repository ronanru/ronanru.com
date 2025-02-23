<script lang="ts">
  import { scale } from "svelte/transition";

  const {
    isOpen = $bindable(),
  }: {
    isOpen: boolean;
  } = $props();

  const date = new Date();
</script>

{#if isOpen}
  <section
    transition:scale
    class="calendar absolute left-16 bottom-0 z-10000 grid origin-bottom-left grid-cols-7 rounded-tr-lg bg-white bg-opacity-80 p-2 text-center backdrop-blur-sm dark:bg-zinc-900 dark:bg-opacity-80">
    {#each ["M", "T", "W", "T", "F", "S", "S"] as day}
      <span class="p-1 font-bold">{day}</span>
    {/each}
    <span
      style:grid-column="1 / {new Date(
        date.getFullYear(),
        date.getMonth(),
        1,
      ).getDay()}"></span>
    {#each [...new Array(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()).keys()] as day}
      <span
        class="rounded-lg p-1"
        class:dark:bg-blue-800={day === date.getDate() - 1}
        class:bg-blue-200={day === date.getDate() - 1}>{day + 1}</span>
    {/each}
  </section>
{/if}
