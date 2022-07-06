<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { createRecord, getFromPath } from '../fs';
  import icon from '../../assets/icons/notepad.svg';
  import BaseWindow from './BaseWindow.svelte';

  const dispatch = createEventDispatcher(),
    saveFile = () => {
      if (!detail) {
        const name = prompt('Name of the file:');
        if (!name) return;
        if (!/[0-9a-zA-Z]+/.test(name)) return alert('Error: non-allowed characters');
        detail = [`${name}.txt`];
      }
      createRecord(detail, value);
    };

  export let isOpen: boolean, detail: string[] | null | undefined;

  let value = '';

  onMount(() => detail && (value = getFromPath(detail) as string));
</script>

<BaseWindow
  title="{detail ? detail.at(-1) : 'New file'} - Notepad"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  on:close={() => dispatch('close')}
  on:mousedown={() => dispatch('mousedown')}
>
  <div class="flex flex-col h-full">
    <div class="bg-zinc-200 dark:bg-zinc-900 py-2 px-4 rounded-lg mb-4 resize-none">
      <button on:click={saveFile}>Save</button>
    </div>
    <textarea bind:value class="w-[calc(100%_-_1rem)] h-full flex-1 mx-2 bg-transparent" />
  </div>
</BaseWindow>
