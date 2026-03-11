export function renderApp(root: HTMLElement): void {
  root.innerHTML = `
    <main class="app-shell">
      <section class="todo-card" aria-label="Todo app"></section>
    </main>
  `;
}
