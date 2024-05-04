import { writable } from "svelte/store";

const settingsFromLocalStorage = localStorage.getItem("settings");
let settingsValue: {
  theme: "light" | "dark";
  wallpaper: number;
} = {
  theme: "light",
  wallpaper: 0,
};

if (settingsFromLocalStorage) {
  try {
    settingsValue = JSON.parse(settingsFromLocalStorage);
  } catch (e) {
    console.error("Error parsing settings from local storage:", e);
  }
}

export const settings = writable(settingsValue);

settings.subscribe((v) => {
  localStorage.setItem("settings", JSON.stringify(v));
  document.documentElement.classList[v.theme === "dark" ? "add" : "remove"](
    "dark",
  );
});
