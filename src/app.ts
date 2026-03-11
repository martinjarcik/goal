import type { Todo } from "./todos";

function renderAddForm(inputValue: string): string {
  const isDisabled = inputValue.trim() === "";

  return `
    <form class="todo-form">
      <input
        class="todo-input"
        type="text"
        placeholder="New item"
        value="${inputValue}"
      />
      <button class="add-button" type="button" ${isDisabled ? "disabled" : ""}>
        Add
      </button>
    </form>
  `;
}

function renderEmptyState(): string {
  return `
    <p class="todo-empty">No todos yet. Start by adding your first item.</p>
  `;
}

function renderTodoList(todos: Todo[]): string {
  const items = todos
    .map(
      (todo) => `
        <li class="todo-item">
          <label class="todo-main">
            <input
              class="todo-checkbox"
              type="checkbox"
              data-todo-id="${todo.id}"
              ${todo.completed ? "checked" : ""}
            />
            <span class="todo-text">${todo.label}</span>
          </label>
        </li>
      `
    )
    .join("");

  return `<ul class="todo-list">${items}</ul>`;
}

export function renderApp(
  root: HTMLElement,
  todos: Todo[],
  inputValue = ""
): void {
  root.innerHTML = `
    <main class="app-root" data-testid="app-root">
      <section class="todo-card" aria-label="Todo app">
        <h1 class="app-title">Todo</h1>
        ${renderAddForm(inputValue)}
        ${todos.length === 0 ? renderEmptyState() : renderTodoList(todos)}
      </section>
    </main>
  `;
}

export function mountApp(root: HTMLElement, initialTodos: Todo[]): void {
  let todos = [...initialTodos];
  let inputValue = "";

  const addTodo = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      return;
    }

    todos = [
      ...todos,
      { id: crypto.randomUUID(), label: trimmedValue, completed: false }
    ];
    inputValue = "";
    rerender();
  };

  const rerender = () => {
    renderApp(root, todos, inputValue);

    const form = root.querySelector<HTMLFormElement>(".todo-form");
    const input = root.querySelector<HTMLInputElement>(".todo-input");
    const addButton = root.querySelector<HTMLButtonElement>(".add-button");

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      addTodo();
    });

    input?.addEventListener("input", (event) => {
      inputValue = (event.target as HTMLInputElement).value;

      if (addButton) {
        addButton.disabled = inputValue.trim() === "";
      }
    });

    input?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      addTodo();
    });

    addButton?.addEventListener("click", () => {
      addTodo();
    });
  };

  rerender();
}
