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
  <div class="flex h-full flex-col items-center justify-center gap-4 text-center">
    <h1 class="text-2xl font-bold">Welcome to my site! 👋</h1>
    <p>Hello, my name is Matvey and I'm a full-stack web developer.</p>
    <p>
      If you want to play with other programs, click the start menu in the top left corner. <br />
      If you want to learn more about me, click the button below.
    </p>
    <button
      on:click={() => openWindow('aboutme')}
      class="rounded-md bg-blue-600 p-4 text-white hover:bg-blue-700">About me</button>
  </div>
</BaseWindow>
