import "./app.css";
import { renderApp } from "./app";
import { appendTodo, createInitialTodos, deleteTodo, toggleTodo } from "./todos";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("App root not found");
}

const appRoot = root;

let todos = createInitialTodos();
let draftTodoText = "";

function handleAdd(label: string): void {
  todos = appendTodo(todos, label);
  render();
}

function handleToggle(id: string): void {
  todos = toggleTodo(todos, id);
  render();
}

function handleDelete(id: string): void {
  todos = deleteTodo(todos, id);
  render();
}

function handleInputChange(value: string): void {
  draftTodoText = value;
}

function render(): void {
  renderApp(appRoot, todos, handleAdd, handleToggle, draftTodoText, handleInputChange, handleDelete);
}

render();
