<script lang="ts">
  export let icon: string,
    size = 1;
</script>

<svg class={['h-6 w-6', 'h-8 w-8', 'h-10 w-10', 'h-12 w-12'][size]} viewBox="0 0 24 24">
  <path fill="currentColor" d={icon} />
</svg>
