export function renderApp(root: HTMLElement): void {
  root.innerHTML = `
    <main class="app-root" data-testid="app-root">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
      </section>
    </main>
  `;
}
