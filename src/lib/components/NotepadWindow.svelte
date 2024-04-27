<script lang="ts">
  import { onMount } from "svelte";
  import icon from "../../assets/icons/notepad.svg";
  import { createRecord, getFromPath } from "../fs";
  import BaseWindow from "./BaseWindow.svelte";

  const saveFile = () => {
    if (!detail) {
      const name = prompt("Name of the file:");
      if (!name) return;
      if (!/[0-9a-zA-Z]+/.test(name))
        return alert("Error: non-allowed characters");
      detail = [`${name}.txt`];
    }
    createRecord(detail, value);
  };

  let {
    isOpen = $bindable(),
    onclose,
    onpointerdown,
    detail,
  }: {
    isOpen: boolean;
    onclose: () => void;
    onpointerdown: () => void;
    detail: string[] | null | undefined;
  } = $props();

  let value = $state("");

  onMount(() => detail && (value = getFromPath(detail) as string));
</script>

<BaseWindow
  title="{detail ? detail.at(-1) : 'New file'} - Notepad"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  <div class="flex h-full flex-col">
    <div
      class="mb-4 resize-none rounded-lg bg-zinc-200 py-2 px-4 dark:bg-zinc-800">
      <button onclick={saveFile}>Save</button>
    </div>
    <textarea
      bind:value
      class="mx-2 h-full w-[calc(100%_-_1rem)] flex-1 bg-transparent"
    ></textarea>
  </div>
</BaseWindow>
