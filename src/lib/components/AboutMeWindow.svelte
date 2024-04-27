<script lang="ts">
  import icon from "../../assets/icons/about-me.svg";
  import AboutMeContent from "./AboutMeContent.svelte";
  import BaseWindow from "./BaseWindow.svelte";

  let {
    isOpen = $bindable(),
    onpointerdown,
    onclose,
  }: {
    isOpen: boolean;
    onpointerdown: () => void;
    onclose: () => void;
  } = $props();
</script>

<BaseWindow
  title="About Me"
  {icon}
  height={565}
  width={600}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  <AboutMeContent />
</BaseWindow>
