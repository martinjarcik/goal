import type { Todo } from "./todos";

function renderEmptyState(): string {
  return `
    <p class="todo-empty">No todos yet. Start by adding your first item.</p>
  `;
}

function renderTodoList(todos: Todo[]): string {
  const items = todos
    .map((todo) => `<li class="todo-item"><span>${todo.label}</span></li>`)
    .join("");

  return `<ul class="todo-list">${items}</ul>`;
}

export function renderApp(root: HTMLElement, todos: Todo[]): void {
  root.innerHTML = `
    <main class="app-root" data-testid="app-root">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
        ${todos.length === 0 ? renderEmptyState() : renderTodoList(todos)}
      </section>
    </main>
  `;
}

export function mountApp(root: HTMLElement, initialTodos: Todo[]): void {
  let todos = [...initialTodos];

  const rerender = () => {
    renderApp(root, todos);
  };

  rerender();
}
