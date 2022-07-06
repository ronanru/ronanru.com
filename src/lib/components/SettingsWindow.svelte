<script lang="ts">
  import wallpaper1 from '../../assets/wallpapers/0.webp';
  import wallpaper2 from '../../assets/wallpapers/1.webp';
  import wallpaper3 from '../../assets/wallpapers/2.webp';
  import wallpaper4 from '../../assets/wallpapers/3.webp';
  import icon from '../../assets/icons/settings.svg';
  import { createEventDispatcher } from 'svelte';
  import BaseWindow from './BaseWindow.svelte';
  import settings from '../settings';

  const dispatch = createEventDispatcher();

  export let isOpen: boolean;
</script>

<BaseWindow
  title="Settings"
  {icon}
  height={600}
  width={500}
  bind:isOpen
  on:close={() => dispatch('close')}
  on:mousedown={() => dispatch('mousedown')}
>
  <div class="max-w-lg flex flex-col gap-4 mx-auto">
    <h1 class="text-2xl font-bold">Appearance</h1>
    <section class="flex justify-between items-center">
      <label for="themeInput">System theme</label>
      <select
        bind:value={$settings.theme}
        id="themeInput"
        class="p-2 rounded-md bg-zinc-300 dark:bg-zinc-900"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </section>
    <section>
      <p>Wallpapers</p>
      <div class="grid gap-8 p-4 grid-cols-2">
        {#each [wallpaper1, wallpaper2, wallpaper3, wallpaper4] as wallpaper, i}
          <button
            on:click={() => ($settings.wallpaper = i)}
            class="aspect-video overflow-hidden rounded-lg mx-auto ring-blue-500 ring-offset-2 dark:ring-offset-zinc-800"
            class:ring-2={$settings.wallpaper == i}
          >
            <img src={wallpaper} alt="" />
          </button>
        {/each}
      </div>
    </section>
  </div>
</BaseWindow>
