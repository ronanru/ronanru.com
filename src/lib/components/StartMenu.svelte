<script lang="ts">
  import fileManagerIcon from '../../assets/icons/file-manager.svg';
  import minesweeperIcon from '../../assets/icons/minesweeper.svg';
  import calculatorIcon from '../../assets/icons/calculator.svg';
  import settingsIcon from '../../assets/icons/settings.svg';
  import terminalIcon from '../../assets/icons/terminal.svg';
  import aboutMeIcon from '../../assets/icons/about-me.svg';
  import nodepadIcon from '../../assets/icons/notepad.svg';
  import welcomeIcon from '../../assets/icons/welcome.svg';
  import rebootIcon from '../../assets/icons/reboot.svg';
  import { scale } from 'svelte/transition';

  export let isOpen: boolean, openWindow: (type: string) => void;

  const programs = [
    { name: 'welcome', title: 'Welcome', icon: welcomeIcon },
    { name: 'aboutme', title: 'About Me', icon: aboutMeIcon },
    { name: 'terminal', title: 'Terminal', icon: terminalIcon },
    { name: 'filemanager', title: 'File Manager', icon: fileManagerIcon },
    { name: 'notepad', title: 'Notepad', icon: nodepadIcon },
    { name: 'calculator', title: 'Calculator', icon: calculatorIcon },
    { name: 'minesweeper', title: 'Minesweeper', icon: minesweeperIcon },
    { name: 'settings', title: 'Settings', icon: settingsIcon }
  ];
</script>

{#if isOpen}
  <section
    transition:scale
    class="startmenu absolute top-0 left-16 z-[10000] grid origin-top-left gap-2 rounded-br-lg bg-white bg-opacity-80 p-2 backdrop-blur dark:bg-zinc-900 dark:bg-opacity-80">
    {#each programs as program}
      <button
        on:click={() => openWindow(program.name)}
        class="flex items-center justify-start gap-4 rounded-lg py-2 px-4 text-xl hover:bg-blue-200 dark:hover:bg-blue-900">
        <img src={program.icon} width="40" height="40" class="h-10 w-10" alt="" />
        {program.title}
      </button>
    {/each}
    <button
      on:click={() => location.reload()}
      class="flex items-center justify-start gap-4 rounded-lg py-2 px-4 text-xl hover:bg-blue-200 dark:hover:bg-blue-900">
      <img src={rebootIcon} width="40" height="40" class="h-10 w-10" alt="" />
      Reboot
    </button>
  </section>
{/if}
