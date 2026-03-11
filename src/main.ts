import "./app.css";
import { renderApp } from "./app";
import { appendTodo, createInitialTodos } from "./todos";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("App root not found");
}

const appRoot = root;

let todos = createInitialTodos();

function handleAdd(label: string): void {
  todos = appendTodo(todos, label);
  render();
}

function render(): void {
  renderApp(appRoot, todos, handleAdd);
}

render();
