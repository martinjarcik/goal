import type { Todo } from "./todos";

export function renderApp(root: HTMLElement, _todos: Todo[]): void {
  root.innerHTML = `
    <main class="app-root" data-testid="app-root">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
      </section>
    </main>
  `;
}
