<script lang="ts">
  import fileManagerIcon from '../../assets/icons/file-manager.svg';
  import minesweeperIcon from '../../assets/icons/minesweeper.svg';
  import settingsIcon from '../../assets/icons/settings.svg';
  import terminalIcon from '../../assets/icons/terminal.svg';
  import aboutMeIcon from '../../assets/icons/about-me.svg';
  import nodepadIcon from '../../assets/icons/notepad.svg';
  import welcomeIcon from '../../assets/icons/welcome.svg';
  import rebootIcon from '../../assets/icons/reboot.svg';
  import { scale } from 'svelte/transition';

  export let isOpen: boolean, openWindow: (type: string) => void;

  const programs = [
    { name: 'filemanager', title: 'File Manager', icon: fileManagerIcon },
    { name: 'notepad', title: 'Notepad', icon: nodepadIcon },
    { name: 'welcome', title: 'Welcome', icon: welcomeIcon },
    { name: 'aboutme', title: 'About Me', icon: aboutMeIcon },
    { name: 'terminal', title: 'Terminal', icon: terminalIcon },
    { name: 'minesweeper', title: 'Minesweeper', icon: minesweeperIcon },
    { name: 'settings', title: 'Settings', icon: settingsIcon }
  ];
</script>

{#if isOpen}
  <section
    transition:scale
    class="startmenu absolute top-0 left-16 p-2 dark:bg-zinc-900 bg-white bg-opacity-80 dark:bg-opacity-80 rounded-br-lg z-[10000] grid gap-2 backdrop-blur origin-top-left"
  >
    {#each programs as program}
      <button
        on:click={() => openWindow(program.name)}
        class="flex gap-4 items-center justify-start text-xl hover:bg-blue-200 dark:hover:bg-blue-900 py-2 px-4 rounded-lg"
      >
        <img src={program.icon} width="40" height="40" class="w-10 h-10" alt="" />
        {program.title}
      </button>
    {/each}
    <button
      on:click={() => location.reload()}
      class="flex gap-4 items-center justify-start text-xl hover:bg-blue-200 dark:hover:bg-blue-900 py-2 px-4 rounded-lg"
    >
      <img src={rebootIcon} width="40" height="40" class="w-10 h-10" alt="" />
      Reboot
    </button>
  </section>
{/if}
