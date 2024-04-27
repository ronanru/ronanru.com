<script lang="ts">
  const {
    icon,
    size = 1,
  }: {
    icon: string;
    size?: number;
  } = $props();
</script>

<svg
  class={[
    "h-3 w-3",
    "h-4 w-4",
    "h-6 w-6",
    "h-8 w-8",
    "h-10 w-10",
    "h-12 w-12",
    "h-20 w-20",
  ][size + 2]}
  viewBox="0 0 24 24">
  <path fill="currentColor" d={icon} />
</svg>
