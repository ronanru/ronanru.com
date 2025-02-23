<script lang="ts">
  import { mdiArrowUpBold } from "@mdi/js";
  import { getContext } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";
  import icon from "../../assets/icons/file-manager.svg";
  import fileIcon from "../../assets/icons/file.svg";
  import folderIcon from "../../assets/icons/folder.svg";
  import { createRecord, deleteRecord, getFromPath, type Folder } from "../fs";
  import BaseWindow from "./BaseWindow.svelte";
  import Icon from "./Icon.svelte";

  const openWindow =
    getContext<(type: string, detail?: string[] | null) => void>("openWindow");
  const handleArrowUp = () => {
    dir.pop();
    selectedItem = null;
  };
  const openFile = (file: [string, string | object]) => {
    if (typeof file[1] === "string") openWindow("notepad", [...dir, file[0]]);
    else dir = [...dir, file[0]];
    selectedItem = null;
  };
  const handleFileContextMenu = (e: MouseEvent & { target: HTMLElement }) => {
    e.preventDefault();
    if (!e.target.closest(".file")) openContextMenu(e, null);
  };
  const openContextMenu = (e: MouseEvent, file: string | null) =>
    (contextMenu = { x: e.layerX, y: e.layerY, file });
  const createNewFile = () => {
    contextMenu = null;
    const name = prompt("Name of the file:");
    if (!name) return;
    if (!/[0-9a-zA-Z]+/.test(name))
      return alert("Error: non-allowed characters");
    createRecord([...dir, `${name}.txt`], "");
    updateFiles();
  };
  const createNewFolder = () => {
    contextMenu = null;
    const name = prompt("Name of the folder:");
    if (!name) return;
    if (!/[0-9a-zA-Z]+/.test(name))
      return alert("Error: non-allowed characters");
    createRecord([...dir, name], {});
    updateFiles();
  };
  const deleteFile = () => {
    if (!contextMenu?.file) return;
    deleteRecord([...dir, contextMenu.file]);
    updateFiles();
    contextMenu = null;
  };
  const handleWindowClick = (e: MouseEvent & { target: HTMLElement }) =>
    !e.target.closest(".contextmenu") && (contextMenu = null);

  let dir = $state<string[]>([]);
  let selectedItem = $state<string | null>(null);
  let contextMenu = $state<{
    x: number;
    y: number;
    file: string | null;
  } | null>(null);

  let files = $state<[string, string | Folder][]>([]);

  const updateFiles = () => {
    files = Object.entries(getFromPath(dir))
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .sort((a) => (typeof a[1] === "string" ? 1 : -1));
  };

  $effect(updateFiles);

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

<svelte:window
  onclick={handleWindowClick as unknown as MouseEventHandler<Window>} />

<BaseWindow
  title="File Manager"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  {#if contextMenu}
    <div
      class="contextmenu absolute grid rounded-lg p-1 bg-white shadow-lg dark:bg-zinc-800"
      style:top="{contextMenu.y}px"
      style:left="{contextMenu.x}px">
      {#if contextMenu.file}
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onclick={deleteFile}>
          Delete
        </button>
      {:else}
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onclick={createNewFolder}>
          New folder
        </button>
        <button
          class="rounded-lg p-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900"
          onclick={createNewFile}>
          New file
        </button>
      {/if}
    </div>
  {/if}
  <div class="mb-8 flex gap-4">
    <button
      onclick={handleArrowUp}
      class="rounded-lg bg-zinc-200 p-2 dark:bg-zinc-800">
      <Icon icon={mdiArrowUpBold} size={0} /></button>
    <p
      class="flex w-full gap-2 rounded-lg bg-zinc-200 py-2 px-4 dark:bg-zinc-800">
      /{dir.join("/")}
    </p>
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class=" h-[calc(100%_-_5rem)]"
    oncontextmenu={handleFileContextMenu as unknown as MouseEventHandler<HTMLDivElement>}>
    <div
      class="grid w-full grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-4">
      {#each files as file}
        <button
          onclick={() => ([selectedItem] = file)}
          ondblclick={() => openFile(file)}
          oncontextmenu={(e) => {
            e.preventDefault();
            openContextMenu(e, file[0]);
          }}
          class:bg-blue-200={selectedItem === file[0]}
          class:dark:bg-blue-900={selectedItem === file[0]}
          class="file flex flex-col items-center justify-center gap-1 rounded-lg">
          <img
            src={typeof file[1] === "string" ? fileIcon : folderIcon}
            alt="" />
          {file[0]}
        </button>
      {/each}
    </div>
  </div>
</BaseWindow>
