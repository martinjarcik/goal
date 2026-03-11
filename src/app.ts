export function renderApp(root: HTMLElement): void {
  root.innerHTML = `
    <main class="app-shell">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
        <div class="todo-card-body"></div>
      </section>
    </main>
  `;
}
