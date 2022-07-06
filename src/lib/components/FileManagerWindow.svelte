<script lang="ts">
  import { getFromPath, createRecord, deleteRecord } from '../fs';
  import { createEventDispatcher, getContext } from 'svelte';
  import icon from '../../assets/icons/file-manager.svg';
  import folderIcon from '../../assets/icons/folder.svg';
  import fileIcon from '../../assets/icons/file.svg';
  import BaseWindow from './BaseWindow.svelte';
  import { mdiArrowUpBold } from '@mdi/js';
  import Icon from './Icon.svelte';

  const dispatch = createEventDispatcher(),
    openWindow = getContext<(type: string, detail: any) => void>('openWindow'),
    handleArrowUp = () => {
      const d = dir;
      d.pop();
      dir = d;
      selectedItem = null;
    },
    openFile = file => {
      if (typeof file[1] === 'string') openWindow('notepad', [...dir, file[0]]);
      else dir = [...dir, file[0]];
      selectedItem = null;
    },
    handleFileContextMenu = e => !e.target.closest('.file') && openContextMenu(e, null),
    openContextMenu = (e, file) => (contextMenu = { x: e.layerX, y: e.layerY, file }),
    createNewFile = () => {
      contextMenu = null;
      const name = prompt('Name of the file:');
      if (!name) return;
      if (!/[0-9a-zA-Z]+/.test(name)) return alert('Error: non-allowed characters');
      createRecord([...dir, `${name}.txt`], '');
      dir = dir;
    },
    createNewFolder = () => {
      contextMenu = null;
      const name = prompt('Name of the folder:');
      if (!name) return;
      if (!/[0-9a-zA-Z]+/.test(name)) return alert('Error: non-allowed characters');
      createRecord([...dir, name], {});
      dir = dir;
    },
    deleteFile = () => {
      deleteRecord([...dir, contextMenu.file]);
      dir = dir;
      contextMenu = null;
    },
    handleWindowClick = e => !e.target.closest('.contextmenu') && (contextMenu = null);

  let dir = [],
    selectedItem: string | null = null,
    contextMenu: { x: number; y: number; file: string | null } | null = null;

  $: files = Object.entries(getFromPath(dir))
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .sort(a => (typeof a[1] === 'string' ? 1 : -1));

  export let isOpen: boolean;
</script>

<svelte:window on:click={handleWindowClick} />

<BaseWindow
  title="File Manager"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  on:close={() => dispatch('close')}
  on:mousedown={() => dispatch('mousedown')}
>
  {#if contextMenu}
    <div
      class="contextmenu grid bg-white dark:bg-zinc-900 rounded-lg shadow-lg absolute border border-zinc-500"
      style:top="{contextMenu.y}px"
      style:left="{contextMenu.x}px"
    >
      {#if contextMenu.file}
        <button
          class="p-1 text-left rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          on:click={deleteFile}
        >
          Delete
        </button>
      {:else}
        <button
          class="p-1 text-left rounded-t-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          on:click={createNewFolder}
        >
          New folder
        </button>
        <button
          class="p-1 text-left rounded-b-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          on:click={createNewFile}
        >
          New file
        </button>
      {/if}
    </div>
  {/if}
  <div class="flex gap-4 mb-8">
    <button on:click={handleArrowUp} class="bg-zinc-200 dark:bg-zinc-900 p-2 rounded-lg">
      <Icon icon={mdiArrowUpBold} size={0} /></button
    >
    <p class="w-full bg-zinc-200 dark:bg-zinc-900 py-2 px-4 rounded-lg flex gap-2">
      /{dir.join('/')}
    </p>
  </div>
  <div class=" h-[calc(100%_-_5rem)]" on:contextmenu|preventDefault={handleFileContextMenu}>
    <div class="grid grid-cols-[repeat(auto-fill,_minmax(5rem,_1fr))] w-full gap-4">
      {#each files as file}
        <button
          on:click={() => (selectedItem = file[0])}
          on:dblclick={() => openFile(file)}
          on:contextmenu|preventDefault={e => openContextMenu(e, file[0])}
          class:bg-blue-200={selectedItem === file[0]}
          class:dark:bg-blue-900={selectedItem === file[0]}
          class="file flex justify-center items-center gap-1 flex-col  rounded-lg"
        >
          <img src={typeof file[1] === 'string' ? fileIcon : folderIcon} alt="" />
          {file[0]}
        </button>
      {/each}
    </div>
  </div>
</BaseWindow>
