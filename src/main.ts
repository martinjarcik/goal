import "./app.css";
import { renderApp } from "./app";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("App root not found");
}

renderApp(root);
