<script lang="ts">
  import AboutMeContent from './AboutMeContent.svelte';
  import icon from '../../assets/icons/about-me.svg';
  import { createEventDispatcher } from 'svelte';
  import BaseWindow from './BaseWindow.svelte';

  const dispatch = createEventDispatcher();

  export let isOpen: boolean;
</script>

<BaseWindow
  title="About Me"
  {icon}
  height={900}
  width={700}
  bind:isOpen
  on:close={() => dispatch('close')}
  on:mousedown={() => dispatch('mousedown')}>
  <AboutMeContent />
</BaseWindow>
