type TodoViewModel = {
  id: string;
  label: string;
};

export function renderApp(root: HTMLElement, _todos: ReadonlyArray<TodoViewModel> = []): void {
  root.innerHTML = `
    <main class="app-shell">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
        <div class="todo-card-body"></div>
      </section>
    </main>
  `;
}
