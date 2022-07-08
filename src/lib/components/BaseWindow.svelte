<script lang="ts">
  import { mdiWindowClose, mdiWindowMinimize, mdiWindowMaximize } from '@mdi/js';
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from './Icon.svelte';

  type ResizeMode = 'tl' | 'tr' | 'bl' | 'br' | 't' | 'r' | 'b' | 'l' | '';

  export let width = 500,
    height = 300,
    isOpen = true,
    title: string,
    icon: string;

  let isDragging = false,
    lastX,
    lastY,
    innerHeight,
    innerWidth,
    x,
    y,
    isMaximized = false,
    mouseNear: ResizeMode = '',
    resizing: ResizeMode = '';

  onMount(() => {
    y = (innerHeight - height) / 2;
    x = (innerWidth - width) / 2;
    lastX = x;
    lastY = y;
  });

  const dispatch = createEventDispatcher(),
    handleHeaderMousedown = (e: MouseEvent) => {
      if (mouseNear) return;
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    },
    handleWindowMousemove = (e: MouseEvent) => {
      if (isDragging) {
        x = Math.min(Math.max(x + e.clientX - lastX, 64), innerWidth - width);
        y = Math.min(Math.max(y + e.clientY - lastY, 0), innerHeight - height);
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      if (resizing) {
        if (resizing.includes('r'))
          width = Math.min(Math.max(width + e.clientX - lastX, 360), innerWidth - x);
        else if (resizing.includes('l')) {
          const oldWidth = width;
          width = Math.min(Math.max(width + lastX - e.clientX, 360), x + width - 64);
          x += oldWidth - width;
        }
        if (resizing.includes('b'))
          height = Math.min(Math.max(height + e.clientY - lastY, 360), innerHeight - y);
        else if (resizing.includes('t')) {
          const oldHeight = height;
          height = Math.min(Math.max(height + lastY - e.clientY, 360), y + height);
          y += oldHeight - height;
        }
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      mouseNear = '';

      mouseNear =
        e.clientY > y - 5 &&
        e.clientY < y + height + 5 &&
        e.clientX > x - 5 &&
        e.clientX < x + width + 5
          ? (`${Math.abs(e.clientY - y) < 5 ? 't' : ''}${
              Math.abs(e.clientY - y - height) < 5 ? 'b' : ''
            }${Math.abs(e.clientX - x) < 5 ? 'l' : ''}${
              Math.abs(e.clientX - x - width) < 5 ? 'r' : ''
            }` as ResizeMode)
          : '';
    },
    handleWindowMousedown = (e: MouseEvent) => {
      resizing = mouseNear;
      lastX = e.clientX;
      lastY = e.clientY;
    },
    handleWindowMouseup = () => {
      isDragging = false;
      resizing = '';
    },
    mouseNearClass: { [key in ResizeMode]: string } = {
      tr: 'cursor-ne-resize',
      tl: 'cursor-nw-resize',
      bl: 'cursor-sw-resize',
      br: 'cursor-se-resize',
      t: 'cursor-n-resize',
      r: 'cursor-e-resize',
      b: 'cursor-s-resize',
      l: 'cursor-w-resize',
      '': ''
    };
  $: if (isDragging === true) isMaximized = false;
  $: if (isDragging === false && y === 0) isMaximized = true;
</script>

<svelte:window
  on:mousemove={handleWindowMousemove}
  on:mousedown={handleWindowMousedown}
  on:mouseleave={() => (isDragging = false)}
  on:mouseup={handleWindowMouseup}
  bind:innerHeight
  bind:innerWidth />

{#if isOpen}
  <section
    transition:fade
    on:mousedown={() => dispatch('mousedown')}
    class="absolute bg-white shadow-md transition-opacity dark:bg-zinc-800 {mouseNearClass[
      resizing || mouseNear
    ]}"
    class:cursor-move={isDragging}
    class:inset-0={isMaximized}
    class:rounded-lg={!isMaximized}
    style:top="{isMaximized ? 0 : y}px"
    style:left="{isMaximized ? 64 : x}px"
    style:height={isMaximized ? 'auto' : `${height}px`}
    style:width={isMaximized ? 'auto' : `${width}px`}>
    <div
      class="flex rounded-t-lg bg-zinc-100 py-1 px-2 dark:bg-zinc-900"
      on:mousedown={handleHeaderMousedown}
      on:dblclick={() => (isMaximized = !isMaximized)}>
      <img src={icon} alt="" width="24" height="24" class="mr-2 h-6 w-6" />
      {title}
      <div class="flex-1" />
      <button
        on:click={() => (isOpen = false)}
        class="translate-y-1 text-zinc-500  transition-colors hover:text-green-500"
        title="Minimize">
        <Icon icon={mdiWindowMinimize} size={0} />
      </button>
      <button
        on:click={() => (isMaximized = !isMaximized)}
        class="text-zinc-500 transition-colors hover:text-yellow-500"
        title="Maximize">
        <Icon icon={mdiWindowMaximize} size={0} />
      </button>
      <button
        on:click={() => dispatch('close')}
        class="text-zinc-500 transition-colors hover:text-red-500"
        title="Close">
        <Icon icon={mdiWindowClose} size={0} />
      </button>
    </div>
    <div class="h-[calc(100%_-_2rem)] w-full overflow-auto p-4">
      <slot />
    </div>
  </section>
{/if}
