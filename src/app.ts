type TodoViewModel = {
  id: string;
  label: string;
  completed: boolean;
};

type AddTodoAction = (label: string) => void;
type ToggleTodoAction = (id: string) => void;

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
  onAdd: AddTodoAction = () => {},
  onToggle: ToggleTodoAction = () => {}
): void {
  const bodyContent =
    todos.length === 0
      ? '<p class="todo-empty-state">No todos yet.</p>'
      : `
        <ul class="todo-list">
          ${todos
            .map(
              (todo) => `
                <li class="todo-item">
                  <label class="todo-main">
                    <input class="todo-checkbox" type="checkbox" data-todo-id="${todo.id}" ${todo.completed ? "checked" : ""} />
                    <span class="todo-text">${escapeHtml(todo.label)}</span>
                  </label>
                </li>
              `
            )
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
  const toggleInputs = root.querySelectorAll<HTMLInputElement>(".todo-checkbox");

  if (!form || !input || !addButton) {
    throw new Error("Todo form elements not found");
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

  toggleInputs.forEach((toggleInput) => {
    toggleInput.addEventListener("change", () => {
      const todoId = toggleInput.dataset.todoId;

      if (!todoId) {
        throw new Error("Todo toggle id not found");
      }

      onToggle(todoId);
    });
  });
}
