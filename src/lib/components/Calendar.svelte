<script lang="ts">
  import { scale } from 'svelte/transition';

  export let isOpen: boolean;

  const date = new Date();
</script>

{#if isOpen}
  <section
    transition:scale
    class="calendar grid grid-cols-7 absolute left-16 bottom-0 p-2 dark:bg-zinc-900 bg-white bg-opacity-80 dark:bg-opacity-80 rounded-tr-lg z-[10000] text-center backdrop-blur origin-bottom-left"
  >
    {#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as day}
      <span class="p-1 font-bold">{day}</span>
    {/each}
    <span style:grid-column="1 / {new Date(date.getFullYear(), date.getMonth(), 1).getDay()}" />
    {#each [...new Array(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()).keys()] as day}
      <span class="p-1 rounded-lg" class:bg-blue-800={day === date.getDate() - 1}>{day + 1}</span>
    {/each}
  </section>
{/if}
