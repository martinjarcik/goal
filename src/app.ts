export function renderApp(root: HTMLElement): void {
  root.innerHTML = `
    <main class="app-root" data-testid="app-root">
      <div class="app-mount"></div>
    </main>
  `;
}
