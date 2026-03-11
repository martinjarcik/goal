import type { Todo } from "./todos";

function renderEmptyState(): string {
  return `
    <p class="todo-empty">No todos yet. Start by adding your first item.</p>
  `;
}

export function renderApp(root: HTMLElement, todos: Todo[]): void {
  root.innerHTML = `
    <main class="app-root" data-testid="app-root">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
        ${todos.length === 0 ? renderEmptyState() : ""}
      </section>
    </main>
  `;
}
