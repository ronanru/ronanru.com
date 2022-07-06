import { writable } from 'svelte/store';

const settings = writable<{ theme: 'light' | 'dark'; wallpaper: number }>(
  JSON.parse(localStorage.getItem('settings')) || { theme: 'light', wallpaper: 0 }
);

settings.subscribe(v => {
  localStorage.setItem('settings', JSON.stringify(v));
  document.documentElement.classList[v.theme === 'dark' ? 'add' : 'remove']('dark');
});

export default settings;
