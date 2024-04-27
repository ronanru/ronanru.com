import "@fontsource/ubuntu/latin.css";
import { mount } from "svelte";
import App from "./App.svelte";
import "./app.css";

mount(App, {
  target: document.getElementById("app")!,
});
