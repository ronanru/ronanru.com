<script lang="ts">
  import { mdiFlagTriangle, mdiMine } from "@mdi/js";
  import { onMount } from "svelte";
  import icon from "../../assets/icons/minesweeper.svg";
  import BaseWindow from "./BaseWindow.svelte";
  import Icon from "./Icon.svelte";

  type Cell = {
    value: number;
    isOpen: boolean;
    isFlagged: boolean;
  };

  let board = $state<Cell[][]>([]);
  let isGameFinished = $state(false);

  const startGame = () => {
    isGameFinished = false;
    board = new Array(10).fill(0).map(() =>
      new Array(10).fill(0).map(() => ({
        isOpen: false,
        isFlagged: false,
        value: Math.random() > 0.85 ? -1 : 0,
      })),
    );
    for (let i = 0; i < board.length; i++)
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].value === -1) continue;
        board[i][j].value = 0;
        for (
          let ii = Math.max(0, i - 1);
          ii < Math.min(board.length, i + 2);
          ii++
        )
          for (
            let jj = Math.max(0, j - 1);
            jj < Math.min(board[i].length, j + 2);
            jj++
          )
            if (board[ii][jj].value === -1) board[i][j].value++;
      }
  };

  const toggleFlag = (i: number, j: number) =>
    (board[i][j].isFlagged = !board[i][j].isFlagged);

  const openCell = (i: number, j: number) => {
    if (
      board.every((row) => row.every((cell) => !cell.isOpen)) &&
      board[i][j].value !== 0
    ) {
      startGame();
      openCell(i, j);
    }

    if (board[i][j].isOpen || board[i][j].isFlagged) return;
    board[i][j].isOpen = true;
    if (board[i][j].value === 0)
      for (
        let ii = Math.max(0, i - 1);
        ii < Math.min(board.length, i + 2);
        ii++
      )
        for (
          let jj = Math.max(0, j - 1);
          jj < Math.min(board[i].length, j + 2);
          jj++
        )
          openCell(ii, jj);
    else if (board[i][j].value === -1) {
      for (let ii = 0; ii < board.length; ii++)
        for (let jj = 0; jj < board[ii].length; jj++)
          if (board[ii][jj].value === -1) board[ii][jj].isOpen = true;
      isGameFinished = true;
    }
    if (
      board.every((row) =>
        row.filter((c) => c.value !== -1).every((c) => c.isOpen),
      )
    )
      isGameFinished = true;
  };

  onMount(startGame);

  let {
    isOpen = $bindable(),
    onclose,
    onpointerdown,
  }: {
    isOpen: boolean;
    onclose: () => void;
    onpointerdown: () => void;
  } = $props();
</script>

<BaseWindow
  title="Minesweeper"
  {icon}
  height={500}
  width={500}
  bind:isOpen
  {onclose}
  {onpointerdown}>
  <div
    class="flex h-full flex-col items-center justify-center gap-4 text-center">
    {#if isGameFinished}
      <button
        onclick={startGame}
        class="rounded-md bg-blue-600 p-4 text-white hover:bg-blue-700">
        New game
      </button>
    {/if}
    <div class="grid grid-cols-10 border border-black dark:border-zinc-800">
      {#each board as row, i}
        {#each row as cell, j}
          <button
            onclick={() => openCell(i, j)}
            oncontextmenu={(e) => {
              e.preventDefault();
              toggleFlag(i, j);
            }}
            class="grid h-8 w-8 place-items-center border border-black font-bold dark:border-zinc-800"
            class:text-blue-600={cell.isOpen && cell.value === 1}
            class:text-green-600={cell.isOpen && cell.value === 2}
            class:text-yellow-600={cell.isOpen && cell.value === 3}
            class:text-purple-600={cell.isOpen && cell.value === 4}
            class:text-red-600={(cell.isOpen && cell.value > 4) ||
              (cell.isFlagged && !cell.isOpen)}
            class:bg-zinc-200={!cell.isOpen}
            class:dark:bg-zinc-600={!cell.isOpen}>
            {#if cell.isOpen}
              {#if cell.value === -1}
                <Icon icon={mdiMine} size={0} />
              {:else if cell.value > 0}
                {cell.value}
              {/if}
            {:else if cell.isFlagged}
              <Icon icon={mdiFlagTriangle} size={0} />
            {/if}
          </button>
        {/each}
      {/each}
    </div>
  </div>
</BaseWindow>
