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
    openWindow = getContext<(type: string, detail?: string[] | null) => void>('openWindow'),
    handleArrowUp = () => {
      const d = dir;
      d.pop();
      dir = d;
      selectedItem = null;
    },
    openFile = (file: [string, string | object]) => {
      if (typeof file[1] === 'string') openWindow('notepad', [...dir, file[0]]);
      else dir = [...dir, file[0]];
      selectedItem = null;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleFileContextMenu = (e: any) => !e.target.closest('.file') && openContextMenu(e, null),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openContextMenu = (e: any, file: string | null) =>
      (contextMenu = { x: e.layerX, y: e.layerY, file }),
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
      if (!contextMenu?.file) return;
      deleteRecord([...dir, contextMenu.file]);
      dir = dir;
      contextMenu = null;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleWindowClick = (e: any) => !e.target.closest('.contextmenu') && (contextMenu = null);

  let dir: string[] = [],
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
  on:mousedown={() => dispatch('mousedown')}>
  {#if contextMenu}
    <div
      class="contextmenu absolute grid rounded-lg p-1 bg-white shadow-lg dark:bg-zinc-800"
      style:top="{contextMenu.y}px"
      style:left="{contextMenu.x}px">
      {#if contextMenu.file}
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          on:click={deleteFile}>
          Delete
        </button>
      {:else}
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          on:click={createNewFolder}>
          New folder
        </button>
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          on:click={createNewFile}>
          New file
        </button>
      {/if}
    </div>
  {/if}
  <div class="mb-8 flex gap-4">
    <button on:click={handleArrowUp} class="rounded-lg bg-zinc-200 p-2 dark:bg-zinc-800">
      <Icon icon={mdiArrowUpBold} size={0} /></button>
    <p class="flex w-full gap-2 rounded-lg bg-zinc-200 py-2 px-4 dark:bg-zinc-800">
      /{dir.join('/')}
    </p>
  </div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class=" h-[calc(100%_-_5rem)]" on:contextmenu|preventDefault={handleFileContextMenu}>
    <div class="grid w-full grid-cols-[repeat(auto-fill,_minmax(5rem,_1fr))] gap-4">
      {#each files as file}
        <button
          on:click={() => ([selectedItem] = file)}
          on:dblclick={() => openFile(file)}
          on:contextmenu|preventDefault={e => openContextMenu(e, file[0])}
          class:bg-blue-200={selectedItem === file[0]}
          class:dark:bg-blue-900={selectedItem === file[0]}
          class="file flex flex-col items-center justify-center gap-1 rounded-lg">
          <img src={typeof file[1] === 'string' ? fileIcon : folderIcon} alt="" />
          {file[0]}
        </button>
      {/each}
    </div>
  </div>
</BaseWindow>
