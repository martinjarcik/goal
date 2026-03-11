import "./app.css";
import { renderApp } from "./app";
import { createInitialTodos } from "./todos";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("App root not found");
}

renderApp(root, createInitialTodos());
