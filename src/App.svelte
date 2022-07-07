<script lang="ts">
  import MinesweeperWindow from './lib/components/MinesweeperWindow.svelte';
  import FileManagerWindow from './lib/components/FileManagerWindow.svelte';
  import TerminalWindow from './lib/components/TerminalWindow.svelte';
  import SettingsWindow from './lib/components/SettingsWindow.svelte';
  import WelcomeWindow from './lib/components/WelcomeWindow.svelte';
  import AboutMeWindow from './lib/components/AboutMeWindow.svelte';
  import NotepadWindow from './lib/components/NotepadWindow.svelte';
  import BootOverlay from './lib/components/BootOverlay.svelte';
  import fileManagerIcon from './assets/icons/file-manager.svg';
  import minesweeperIcon from './assets/icons/minesweeper.svg';
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
      | 'notepad';
    detail?: any;
  }

  let time = new Date().toLocaleTimeString('en-GB', { minute: 'numeric', hour: 'numeric' }),
    interval = setInterval(
      () => (time = new Date().toLocaleTimeString('en-GB', { minute: 'numeric', hour: 'numeric' })),
      60000
    ),
    isMounted = false,
    isStartMenuOpen = false,
    isCalendarOpen = false,
    windows: WindowData[] = [],
    wallpaper;

  const generateId = () =>
      'crypto' in window ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    handleClick = e => {
      if (!e.target.closest('.startmenu')) isStartMenuOpen = false;
      if (!e.target.closest('.calendar')) isCalendarOpen = false;
    },
    closeWindow = (id: string) => {
      windows = windows.map(w => (w.id === id ? { ...w, isOpen: !w.isOpen } : w));
      setTimeout(() => (windows = windows.filter(w => w.id !== id)), 500);
    },
    openWindow = (type: WindowData['type'], detail = null) =>
      (windows = [...windows, { id: generateId(), isOpen: true, type, detail }]),
    focusWindow = (id: string) => {
      if (windows.at(-1).id === id) return;
      windows = [...windows.filter(w => w.id !== id), windows.find(w => w.id === id)];
    };

  setContext('openWindow', openWindow);

  onMount(() => {
    setTimeout(() => (isMounted = true), 2300);
    setTimeout(() => (windows = [{ type: 'welcome', id: generateId(), isOpen: true }]), 2800);
  });
  onDestroy(() => clearInterval(interval));

  $: import(`./assets/wallpapers/${$settings.wallpaper}.webp`).then(d => (wallpaper = d.default));
</script>

<BootOverlay>
  <main
    class="text-black dark:text-white h-screen w-screen bg-origin-content bg-no-repeat bg-cover bg-center"
    style:background-image="url({wallpaper})"
    on:click={handleClick}
  >
    <nav
      class="shadow-md top-0 bottom-0 left-0 absolute w-16 dark:bg-zinc-900 bg-white h-full bg-opacity-80 dark:bg-opacity-80 backdrop-blur flex flex-col items-center transition-transform duration-[1500ms] -translate-x-16 gap-2"
      class:transform-none={isMounted}
    >
      <button
        on:click={() => (isStartMenuOpen = !isStartMenuOpen)}
        class="startmenu rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 active:bg-blue-200 p-1"
      >
        <Icon icon={mdiMenu} size={3} />
      </button>
      {#each windows as window (window.id)}
        <button
          class="p-2 rounded-lg"
          class:bg-blue-200={window.isOpen}
          class:dark:bg-blue-900={window.isOpen}
          on:click={() =>
            (windows = windows.map(w => (w.id === window.id ? { ...w, isOpen: !w.isOpen } : w)))}
        >
          <img
            src={{
              welcome: welcomeIcon,
              aboutme: aboutMeIcon,
              terminal: terminalIcon,
              settings: settingsIcon,
              minesweeper: minesweeperIcon,
              filemanager: fileManagerIcon,
              notepad: nodepadIcon
            }[window.type]}
            width="40"
            height="40"
            class="w-10 h-10"
            alt=""
          />
        </button>
      {/each}
      <div class="flex-1" />
      <button
        class="text-zinc-800 dark:text-zinc-300 dark:hover:bg-blue-900 hover:text-black hover:bg-blue-100 p-1 rounded-full"
      >
        <Icon icon={mdiVolumeHigh} size={0} />
      </button>
      <button
        class="text-zinc-800 dark:text-zinc-300 dark:hover:bg-blue-900 hover:text-black hover:bg-blue-100 p-1 rounded-full"
      >
        <Icon icon={mdiWifi} size={0} />
      </button>
      <button
        on:click={() => (isCalendarOpen = !isCalendarOpen)}
        class="calendar text-center hover:bg-blue-100 dark:hover:bg-blue-900 rounded-t-lg p-2"
      >
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
          notepad: NotepadWindow
        }[window.type]}
        bind:isOpen={window.isOpen}
        detail={window.detail}
        id={window.id}
        on:close={() => closeWindow(window.id)}
        on:mousedown={() => focusWindow(window.id)}
      />
    {/each}
  </main>
</BootOverlay>
