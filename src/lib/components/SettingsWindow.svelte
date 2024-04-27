<script lang="ts">
  import wallpaper1 from "../../assets/wallpapers/0.webp";
  import wallpaper2 from "../../assets/wallpapers/1.webp";
  import wallpaper3 from "../../assets/wallpapers/2.webp";
  import wallpaper4 from "../../assets/wallpapers/3.webp";
  import icon from "../../assets/icons/settings.svg";
  import BaseWindow from "./BaseWindow.svelte";
  import { settings } from "../settings";

  let {
    isOpen = $bindable(),
    onclose,
    onpointerdown,
  }: {
    isOpen: boolean;
    onclose: () => void;
    onpointerdown: () => void;
  } = $props();
</script>

<BaseWindow
  title="Settings"
  {icon}
  height={600}
  width={500}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  <div class="mx-auto flex max-w-lg flex-col gap-4">
    <h1 class="text-2xl font-bold">Appearance</h1>
    <section class="flex items-center justify-between">
      <label for="themeInput">System theme</label>
      <select
        bind:value={$settings.theme}
        id="themeInput"
        class="rounded-md bg-zinc-300 p-2 dark:bg-zinc-800">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </section>
    <section>
      <p>Wallpapers</p>
      <div class="grid grid-cols-2 gap-8 p-4">
        {#each [wallpaper1, wallpaper2, wallpaper3, wallpaper4] as wallpaper, i}
          <button
            onclick={() => ($settings.wallpaper = i)}
            class="mx-auto aspect-video overflow-hidden rounded-lg ring-blue-500 ring-offset-2 dark:ring-offset-zinc-800"
            class:ring-2={$settings.wallpaper === i}>
            <img src={wallpaper} alt="" />
          </button>
        {/each}
      </div>
    </section>
  </div>
</BaseWindow>
