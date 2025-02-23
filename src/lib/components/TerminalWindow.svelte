<script lang="ts">
  import { getContext } from "svelte";
  import icon from "../../assets/icons/terminal.svg";
  import {
    createRecord,
    deleteRecord,
    getFromPath,
    normalizePath,
  } from "../fs";
  import BaseWindow from "./BaseWindow.svelte";

  let input: HTMLInputElement;
  let form: HTMLFormElement;
  let dir = $state<string[]>([]);
  let historyIndex = $state(-1);
  let output = $state("Type `help` to see the list of available commands\n");
  let value = $state("$ ");

  const openWindow = getContext<(type: string) => void>("openWindow");
  const history: string[] = [];
  const handleSubmit = (e: Event) => {
      e.preventDefault();
      if (value === "$ ") return;
      historyIndex = -1;
      history.unshift(value);
      const data = value.slice(2).split(" ");
      output += `${value}\n`;
      value = "$ ";
      switch (data[0]) {
        case "help":
          output += `Available commands:
  help - Print this menu
  clear - Clear the terminal
  reboot - Reboot the computer
  pwd, ls, cd, cat, rm, touch, mkdir - File management commands
  filemanager, notepad, welcome, aboutme, terminal, minesweeper, settings - Commands to open new windows`;
          break;
        case "pwd":
          output += `/${dir.join("/")}\n`;
          break;
        case "clear":
          output = "";
          break;
        case "ls":
          Object.entries(getFromPath(dir))
            .sort((a, b) => (a[0] > b[0] ? 1 : -1))
            .sort((a) => (typeof a[1] === "string" ? 1 : -1))
            .forEach(
              ([name, content]) =>
                (output += `${name}${typeof content === "string" ? "" : "/"}\n`),
            );
          break;
        case "cd": {
          const newDir = normalizePath(
            data[1].startsWith("/")
              ? data[1].split("/")
              : dir.concat(data[1].split("/")),
          );
          const folderData = getFromPath(newDir);
          if (!folderData) {
            output += `Path does not exist\n`;
            break;
          }
          if (typeof folderData === "string") {
            output += `${data[1]} is a file\n`;
            break;
          }
          dir = newDir;
          break;
        }
        case "cat": {
          const file = normalizePath(
            data[1].startsWith("/")
              ? data[1].split("/")
              : dir.concat(data[1].split("/")),
          );
          const content = getFromPath(file);
          if (content === undefined) {
            output += `Path does not exist\n`;
            break;
          }
          if (typeof content !== "string") {
            output += `${data[1]} is not a file\n`;
            break;
          }
          output += `${content}\n`;
          break;
        }
        case "rm": {
          const file = normalizePath(
            data[1].startsWith("/")
              ? data[1].split("/")
              : dir.concat(data[1].split("/")),
          );
          const content = getFromPath(file);
          if (content === undefined) {
            output += `Path does not exist\n`;
            break;
          }
          deleteRecord(file);
          break;
        }
        case "touch":
        case "mkdir": {
          if (!/[0-9a-zA-Z]+/.test(data[1])) {
            output += `Error: non-allowed characters\n`;
            break;
          }
          if (data[0] === "touch" && !data[1].endsWith(".txt")) {
            output += `You can create only .txt files\n`;
            break;
          }
          const file = normalizePath(
            data[1].startsWith("/")
              ? data[1].split("/")
              : dir.concat(data[1].split("/")),
          );
          const content = getFromPath(file);
          if (content !== undefined) {
            output += `Path already exists\n`;
            break;
          }
          createRecord(file, data[0] === "touch" ? "" : {});
          break;
        }
        case "reboot":
          location.reload();
          break;
        case "notepad":
        case "welcome":
        case "aboutme":
        case "terminal":
        case "minesweeper":
        case "settings":
          openWindow(data[0]);
          break;
        default:
          output += `Command not found: ${data[0]}\n`;
      }
      form.scrollTo(0, form.scrollHeight);
    },
    handleKeydown = (e: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp"].includes(e.code)) return;
      historyIndex = Math.min(
        Math.max(historyIndex + (e.code === "ArrowDown" ? -1 : 1), -1),
        history.length - 1,
      );
      value = historyIndex === -1 ? "$ " : history[historyIndex];
    };

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
  title="Terminal"
  {icon}
  height={500}
  width={600}
  bind:isOpen
  {onclose}
  onpointerdown={() => {
    onpointerdown();
    setTimeout(() => input.focus());
  }}>
  <form
    bind:this={form}
    onsubmit={handleSubmit}
    class="flex h-full flex-col justify-start overflow-auto pb-4">
    <pre class="whitespace-pre-wrap">{output}</pre>
    <input
      bind:this={input}
      onkeydown={handleKeydown}
      type="text"
      class="bg-transparent pb-2 font-mono outline-hidden"
      bind:value
      oninput={() => {
        if (!value.startsWith("$ ")) value = "$ ";
      }} />
  </form>
</BaseWindow>

<style>
  form::-webkit-scrollbar {
    display: none;
  }
</style>
