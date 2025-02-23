<script lang="ts">
  import {
    mdiArrowTopRightBottomLeftBold,
    mdiWindowClose,
    mdiWindowMinimize,
  } from "@mdi/js";
  import { onMount, type Snippet } from "svelte";
  import { fade, scale } from "svelte/transition";
  import Icon from "./Icon.svelte";

  type ResizeMode = "tl" | "tr" | "bl" | "br" | "t" | "r" | "b" | "l" | "";

  let {
    width = 500,
    height = 300,
    isOpen = $bindable(true),
    title,
    icon,
    onpointerdown,
    onclose,
    children,
  }: {
    width?: number;
    height?: number;
    isOpen: boolean;
    title: string;
    icon: string;
    onpointerdown: () => void;
    onclose: () => void;
    children: Snippet;
  } = $props();

  let isDragging = $state(false);
  let lastX = $state(0);
  let lastY = $state(0);
  let innerHeight = $state(0);
  let innerWidth = $state(0);
  let x = $state(0);
  let y = $state(0);
  let isMaximized = $state(false);
  let mouseNear = $state<ResizeMode>("");
  let resizing = $state<ResizeMode>("");
  let isMounted = $state(false);

  onMount(() => {
    y = (innerHeight - height) / 2 + Math.random() * 50;
    x = (innerWidth - width) / 2 + Math.random() * 50;
    lastX = x;
    lastY = y;
    isMounted = true;
  });

  const handleHeaderMousedown = (e: MouseEvent) => {
    if (mouseNear) return;
    isDragging = true;
    isMaximized = false;
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const handleWindowMousemove = (e: MouseEvent) => {
    if (isDragging) {
      x = Math.min(Math.max(x + e.clientX - lastX, 64), innerWidth - width);
      y = Math.min(Math.max(y + e.clientY - lastY, 0), innerHeight - height);
      lastX = e.clientX;
      lastY = e.clientY;
      return;
    }
    if (resizing) {
      if (resizing.includes("r"))
        width = Math.min(
          Math.max(width + e.clientX - lastX, 360),
          innerWidth - x,
        );
      else if (resizing.includes("l")) {
        const oldWidth = width;
        width = Math.min(
          Math.max(width + lastX - e.clientX, 360),
          x + width - 64,
        );
        x += oldWidth - width;
      }
      if (resizing.includes("b"))
        height = Math.min(
          Math.max(height + e.clientY - lastY, 360),
          innerHeight - y,
        );
      else if (resizing.includes("t")) {
        const oldHeight = height;
        height = Math.min(
          Math.max(height + lastY - e.clientY, 360),
          y + height,
        );
        y += oldHeight - height;
      }
      lastX = e.clientX;
      lastY = e.clientY;
      return;
    }
    mouseNear = "";

    mouseNear =
      e.clientY > y - 5 &&
      e.clientY < y + height + 5 &&
      e.clientX > x - 5 &&
      e.clientX < x + width + 5
        ? (`${Math.abs(e.clientY - y) < 5 ? "t" : ""}${
            Math.abs(e.clientY - y - height) < 5 ? "b" : ""
          }${Math.abs(e.clientX - x) < 5 ? "l" : ""}${
            Math.abs(e.clientX - x - width) < 5 ? "r" : ""
          }` as ResizeMode)
        : "";
  };
  const handleWindowMousedown = (e: MouseEvent) => {
    resizing = mouseNear;
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const handleWindowMouseup = () => {
    isDragging = false;
    resizing = "";
    if (y === 0) isMaximized = true;
  };
  const mouseNearClass: { [key in ResizeMode]: string } = {
    tr: "cursor-ne-resize",
    tl: "cursor-nw-resize",
    bl: "cursor-sw-resize",
    br: "cursor-se-resize",
    t: "cursor-n-resize",
    r: "cursor-e-resize",
    b: "cursor-s-resize",
    l: "cursor-w-resize",
    "": "",
  };
</script>

<svelte:window
  onpointermove={handleWindowMousemove}
  onpointerdown={handleWindowMousedown}
  onpointerleave={() => (isDragging = false)}
  onpointerup={handleWindowMouseup}
  bind:innerHeight
  bind:innerWidth />

{#if isOpen && isMounted}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <section
    out:fade
    in:scale
    {onpointerdown}
    class="absolute bg-white overflow-hidden shadow-xl transition-[opacity,transform] dark:bg-zinc-900 {mouseNearClass[
      resizing || mouseNear
    ]}"
    class:cursor-move={isDragging}
    class:inset-0={isMaximized}
    class:rounded-lg={!isMaximized}
    style:top="{isMaximized ? 0 : y}px"
    style:left="{isMaximized ? 64 : x}px"
    style:height={isMaximized ? "auto" : `${height}px`}
    style:width={isMaximized ? "auto" : `${width}px`}>
    <div
      class="flex rounded-t-lg bg-white py-1 px-2 dark:bg-zinc-900 items-center"
      onpointerdown={handleHeaderMousedown}
      ondblclick={() => (isMaximized = !isMaximized)}>
      <img src={icon} alt="" width="24" height="24" class="mr-2 h-6 w-6" />
      {title}
      <div class="flex-1"></div>
      <div class="flex gap-1 items-center justify-center">
        <button
          onclick={() => (isOpen = false)}
          class="bg-green-500 rounded-full w-4 h-4 text-transparent dark:hover:text-white hover:text-zinc-800 transition-colors grid place-items-center"
          title="Minimize">
          <Icon icon={mdiWindowMinimize} size={-1} />
        </button>
        <button
          onclick={() => (isMaximized = !isMaximized)}
          class="bg-yellow-500 rounded-full w-4 h-4 text-transparent dark:hover:text-white hover:text-zinc-800 transition-colors grid place-items-center"
          title="Maximize">
          <Icon icon={mdiArrowTopRightBottomLeftBold} size={-2} /></button>
        <button
          onclick={onclose}
          class="bg-red-500 rounded-full w-4 h-4 text-transparent dark:hover:text-white hover:text-zinc-800 transition-colors grid place-items-center"
          title="Close">
          <Icon icon={mdiWindowClose} size={-1} /></button>
      </div>
    </div>
    <div class="h-[calc(100%_-_2rem)] w-full overflow-auto p-4">
      {@render children()}
    </div>
  </section>
{/if}
