<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';
  import icon from '../../assets/icons/welcome.svg';
  import BaseWindow from './BaseWindow.svelte';

  const dispatch = createEventDispatcher(),
    openWindow = getContext<(type: string) => void>('openWindow');

  export let isOpen: boolean;
</script>

<BaseWindow
  title="Welcome"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  on:close={() => dispatch('close')}
  on:mousedown={() => dispatch('mousedown')}>
  <div class="grid place-items-center h-full">
    <div class="space-y-6 w-full">
      <h1 class="text-6xl grid font-bold">
        <span class="bg-gradient-to-tl from-indigo-800 to-blue-600 bg-clip-text text-transparent"
          >Hi there,</span> I'm Matvey
      </h1>
      <p class="text-2xl">I'm a full-stack web developer.</p>
      <button
        on:click={() => openWindow('aboutme')}
        class="rounded-md bg-blue-600 p-4 text-white hover:bg-blue-700 text-lg">About me</button>
    </div>
  </div>
</BaseWindow>
