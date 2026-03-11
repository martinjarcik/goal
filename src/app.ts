type TodoViewModel = {
  id: string;
  label: string;
};

export function renderApp(root: HTMLElement, todos: ReadonlyArray<TodoViewModel> = []): void {
  const bodyContent =
    todos.length === 0 ? '<p class="todo-empty-state">No todos yet.</p>' : "";

  root.innerHTML = `
    <main class="app-shell">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
        <div class="todo-card-body">${bodyContent}</div>
      </section>
    </main>
  `;
}
