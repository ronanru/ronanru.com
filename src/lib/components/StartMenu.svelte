<script lang="ts">
  import aboutMeIcon from "../../assets/icons/about-me.svg";
  import calculatorIcon from "../../assets/icons/calculator.svg";
  import fileManagerIcon from "../../assets/icons/file-manager.svg";
  import minesweeperIcon from "../../assets/icons/minesweeper.svg";
  import nodepadIcon from "../../assets/icons/notepad.svg";
  import rebootIcon from "../../assets/icons/reboot.svg";
  import settingsIcon from "../../assets/icons/settings.svg";
  import terminalIcon from "../../assets/icons/terminal.svg";
  import welcomeIcon from "../../assets/icons/welcome.svg";

  let {
    openWindow,
  }: {
    openWindow: (type: string) => void;
  } = $props();

  let section: HTMLElement;

  const programs = [
    { name: "welcome", title: "Welcome", icon: welcomeIcon },
    { name: "aboutme", title: "About Me", icon: aboutMeIcon },
    { name: "terminal", title: "Terminal", icon: terminalIcon },
    { name: "filemanager", title: "File Manager", icon: fileManagerIcon },
    { name: "notepad", title: "Notepad", icon: nodepadIcon },
    { name: "calculator", title: "Calculator", icon: calculatorIcon },
    { name: "minesweeper", title: "Minesweeper", icon: minesweeperIcon },
    { name: "settings", title: "Settings", icon: settingsIcon },
  ];
</script>

<section
  bind:this={section}
  id="start-menu"
  popover="auto"
  class="left-18 z-10000 grid top-2 scale-95 opacity-0 transition-all transition-discrete ease-out open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0 origin-top-left gap-2 rounded-lg bg-white p-2 dark:bg-zinc-900">
  {#each programs as program}
    <button
      onclick={() => {
        openWindow(program.name);
        section.hidePopover();
      }}
      class="flex items-center justify-start gap-4 rounded-lg py-2 px-4 text-xl hover:bg-blue-200 dark:hover:bg-blue-900">
      <img src={program.icon} width="40" height="40" class="h-10 w-10" alt="" />
      {program.title}
    </button>
  {/each}
  <button
    onclick={() => location.reload()}
    class="flex items-center justify-start gap-4 rounded-lg py-2 px-4 text-xl hover:bg-blue-200 dark:hover:bg-blue-900">
    <img src={rebootIcon} width="40" height="40" class="h-10 w-10" alt="" />
    Reboot
  </button>
</section>
