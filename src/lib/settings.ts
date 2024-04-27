import { writable } from "svelte/store";

export const settings = writable<{
  theme: "light" | "dark";
  wallpaper: number;
}>(
  JSON.parse(localStorage.getItem("settings") || "") || {
    theme: "light",
    wallpaper: 0 | 1 | 2 | 3,
  },
);

settings.subscribe((v) => {
  localStorage.setItem("settings", JSON.stringify(v));
  document.documentElement.classList[v.theme === "dark" ? "add" : "remove"](
    "dark",
  );
});
