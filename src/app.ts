type TodoViewModel = {
  id: string;
  label: string;
};

type AddTodoAction = (label: string) => void;

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderApp(
  root: HTMLElement,
  todos: ReadonlyArray<TodoViewModel> = [],
  onAdd: AddTodoAction = () => {}
): void {
  const bodyContent =
    todos.length === 0
      ? '<p class="todo-empty-state">No todos yet.</p>'
      : `
        <ul class="todo-list">
          ${todos
            .map((todo) => `<li class="todo-item">${escapeHtml(todo.label)}</li>`)
            .join("")}
        </ul>
      `;

  root.innerHTML = `
    <main class="app-shell">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
        <form class="todo-form">
          <input class="todo-input" type="text" placeholder="New item" />
          <button class="add-button" type="submit" disabled>Add</button>
        </form>
        <div class="todo-card-body">${bodyContent}</div>
      </section>
    </main>
  `;

  const form = root.querySelector<HTMLFormElement>(".todo-form");
  const input = root.querySelector<HTMLInputElement>(".todo-input");
  const addButton = root.querySelector<HTMLButtonElement>(".add-button");

  if (!form || !input || !addButton) {
    throw new Error("Add todo form elements not found");
  }

  const syncSubmitState = () => {
    addButton.disabled = input.value.trim().length === 0;
  };

  input.addEventListener("input", syncSubmitState);
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const trimmedValue = input.value.trim();

    if (trimmedValue.length === 0) {
      syncSubmitState();
      return;
    }

    onAdd(trimmedValue);
    input.value = "";
    syncSubmitState();
  });
}
