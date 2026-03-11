type TodoViewModel = {
  id: string;
  label: string;
};

type AddTodoAction = (label: string) => void;

export function renderApp(
  root: HTMLElement,
  todos: ReadonlyArray<TodoViewModel> = [],
  _onAdd: AddTodoAction = () => {}
): void {
  const bodyContent =
    todos.length === 0
      ? '<p class="todo-empty-state">No todos yet.</p>'
      : `
        <ul class="todo-list">
          ${todos
            .map((todo) => `<li class="todo-item">${todo.label}</li>`)
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
}
