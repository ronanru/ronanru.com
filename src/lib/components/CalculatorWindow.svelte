<script lang="ts">
  import icon from '../../assets/icons/calculator.svg';
  import { createEventDispatcher } from 'svelte';
  import BaseWindow from './BaseWindow.svelte';

  let display = 0,
    previousNumber = 0,
    resetNext = false,
    operation = '+';

  const dispatch = createEventDispatcher(),
    buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'],
    handleButton = (char: string) => {
      switch (char) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
          if (resetNext) {
            resetNext = false;
            display = 0;
          }
          display = display * 10 + Number(char);
          break;
        case 'C':
        case 'c':
          display = 0;
          operation = '+';
          previousNumber = 0;
          break;
        case '/':
        case '*':
        case '-':
        case '+':
        case '=':
          switch (operation) {
            case '-':
              previousNumber = previousNumber - display;
              break;
            case '+':
              previousNumber = previousNumber + display;
              break;
            case '/':
              previousNumber = previousNumber / display;
              break;
            case '*':
              previousNumber = previousNumber * display;
              break;
          }
          display = previousNumber;
          if (char !== '=') {
            resetNext = true;
            operation = char;
          }
          break;
      }
    };

  export let isOpen: boolean;
</script>

<BaseWindow
  title="Calculator"
  {icon}
  height={400}
  width={400}
  bind:isOpen
  on:close={() => dispatch('close')}
  on:mousedown={() => dispatch('mousedown')}>
  <div
    on:keypress={e => handleButton(e.key)}
    class="flex h-full flex-col items-center justify-center gap-4 text-center text-2xl">
    <p
      class="flex h-24 w-full items-center justify-end rounded-lg bg-zinc-200 p-4 dark:bg-zinc-900">
      {display}
    </p>
    <div class="grid h-full w-full grid-cols-4 gap-4">
      {#each buttons as char}
        <button
          on:click={() => handleButton(char)}
          class="rounded-xl bg-zinc-200 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >{char}</button>
      {/each}
    </div>
  </div>
</BaseWindow>
