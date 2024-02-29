<script lang="ts">
  import MinesweeperWindow from './lib/components/MinesweeperWindow.svelte';
  import FileManagerWindow from './lib/components/FileManagerWindow.svelte';
  import CalculatorWindow from './lib/components/CalculatorWindow.svelte';
  import TerminalWindow from './lib/components/TerminalWindow.svelte';
  import SettingsWindow from './lib/components/SettingsWindow.svelte';
  import WelcomeWindow from './lib/components/WelcomeWindow.svelte';
  import AboutMeWindow from './lib/components/AboutMeWindow.svelte';
  import NotepadWindow from './lib/components/NotepadWindow.svelte';
  import BootOverlay from './lib/components/BootOverlay.svelte';
  import fileManagerIcon from './assets/icons/file-manager.svg';
  import minesweeperIcon from './assets/icons/minesweeper.svg';
  import calculatorIcon from './assets/icons/calculator.svg';
  import { mdiMenu, mdiWifi, mdiVolumeHigh } from '@mdi/js';
  import StartMenu from './lib/components/StartMenu.svelte';
  import Calendar from './lib/components/Calendar.svelte';
  import { onDestroy, onMount, setContext } from 'svelte';
  import settingsIcon from './assets/icons/settings.svg';
  import terminalIcon from './assets/icons/terminal.svg';
  import aboutMeIcon from './assets/icons/about-me.svg';
  import nodepadIcon from './assets/icons/notepad.svg';
  import welcomeIcon from './assets/icons/welcome.svg';
  import Icon from './lib/components/Icon.svelte';
  import settings from './lib/settings';

  interface WindowData {
    isOpen: boolean;
    id: string;
    type:
      | 'welcome'
      | 'aboutme'
      | 'terminal'
      | 'settings'
      | 'minesweeper'
      | 'filemanager'
      | 'notepad'
      | 'calculator';
    detail?: string[] | null;
  }

  let time = new Date().toLocaleTimeString('en-GB', { minute: 'numeric', hour: 'numeric' }),
    isMounted = false,
    isStartMenuOpen = false,
    isCalendarOpen = false,
    windows: WindowData[] = [],
    wallpaper: string;

  const interval = setInterval(
      () => (time = new Date().toLocaleTimeString('en-GB', { minute: 'numeric', hour: 'numeric' })),
      60000
    ),
    generateId = () =>
      'crypto' in window && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleClick = (e: any) => {
      if (!e.target.closest('.startmenu')) isStartMenuOpen = false;
      if (!e.target.closest('.calendar')) isCalendarOpen = false;
    },
    closeWindow = (id: string) => {
      windows = windows.map(w => (w.id === id ? { ...w, isOpen: !w.isOpen } : w));
      setTimeout(() => (windows = windows.filter(w => w.id !== id)), 500);
    },
    openWindow = (type: string, detail = null) =>
      (windows = [
        ...windows,
        { id: generateId(), isOpen: true, type: type as WindowData['type'], detail }
      ]),
    focusWindow = (id: string) => {
      if (windows.at(-1)?.id === id) return;
      windows = [...windows.filter(w => w.id !== id), windows.find(w => w.id === id)!];
    };

  setContext('openWindow', openWindow);

  onMount(() => {
    setTimeout(() => (isMounted = true), 2300);
    setTimeout(() => (windows = [{ type: 'welcome', id: generateId(), isOpen: true }]), 2800);
  });
  onDestroy(() => clearInterval(interval));

  $: import(`./assets/wallpapers/${$settings.wallpaper}.webp`).then(d => (wallpaper = d.default));
</script>

<svelte:head>
  {#if wallpaper}
    <link rel="preload" as="image" href={wallpaper} />
  {/if}
</svelte:head>

<BootOverlay>
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <main
    class="h-screen w-screen select-none bg-cover bg-center bg-no-repeat bg-origin-content text-black dark:text-white"
    style:background-image="url({wallpaper})"
    on:mousedown={handleClick}>
    <nav
      class="absolute top-0 bottom-0 left-0 flex h-screen overflow-y-hidden w-16 -translate-x-16 flex-col items-center gap-2 bg-white/90 shadow-lg backdrop-blur-md transition-transform duration-[1500ms] dark:bg-zinc-900/90"
      class:transform-none={isMounted}>
      <button
        on:click={() => (isStartMenuOpen = !isStartMenuOpen)}
        class="startmenu rounded-lg p-1 hover:bg-blue-100 active:bg-blue-200 dark:hover:bg-blue-900">
        <Icon icon={mdiMenu} size={3} />
      </button>
      {#each windows as window (window.id)}
        <button
          class="rounded-lg p-2"
          class:bg-blue-200={window.isOpen}
          class:dark:bg-blue-900={window.isOpen}
          on:click={() =>
            (windows = windows.map(w => (w.id === window.id ? { ...w, isOpen: !w.isOpen } : w)))}>
          <img
            src={{
              welcome: welcomeIcon,
              aboutme: aboutMeIcon,
              terminal: terminalIcon,
              settings: settingsIcon,
              minesweeper: minesweeperIcon,
              filemanager: fileManagerIcon,
              notepad: nodepadIcon,
              calculator: calculatorIcon
            }[window.type]}
            width="40"
            height="40"
            class="h-10 w-10"
            alt="" />
        </button>
      {/each}
      <div class="flex-1" />
      <button
        class="rounded-full p-1 text-zinc-800 hover:bg-blue-100 hover:text-black dark:text-zinc-300 dark:hover:bg-blue-900">
        <Icon icon={mdiVolumeHigh} size={0} />
      </button>
      <button
        class="rounded-full p-1 text-zinc-800 hover:bg-blue-100 hover:text-black dark:text-zinc-300 dark:hover:bg-blue-900">
        <Icon icon={mdiWifi} size={0} />
      </button>
      <button
        on:click={() => (isCalendarOpen = !isCalendarOpen)}
        class="calendar rounded-t-lg p-2 text-center hover:bg-blue-100 dark:hover:bg-blue-900">
        {time}
      </button>
    </nav>
    <StartMenu bind:isOpen={isStartMenuOpen} {openWindow} />
    <Calendar bind:isOpen={isCalendarOpen} />
    {#each windows as window (window.id)}
      <svelte:component
        this={{
          welcome: WelcomeWindow,
          aboutme: AboutMeWindow,
          terminal: TerminalWindow,
          settings: SettingsWindow,
          minesweeper: MinesweeperWindow,
          filemanager: FileManagerWindow,
          notepad: NotepadWindow,
          calculator: CalculatorWindow
        }[window.type]}
        bind:isOpen={window.isOpen}
        detail={window.detail}
        on:close={() => closeWindow(window.id)}
        on:mousedown={() => focusWindow(window.id)} />
    {/each}
  </main>
</BootOverlay>
