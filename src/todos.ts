export type Todo = {
  id: string;
  label: string;
  completed: boolean;
};

type BootstrapTodo = Pick<Todo, "id" | "label"> & Partial<Pick<Todo, "completed">>;

export function createInitialTodos(): Todo[] {
  const bootstrapTodos = (
    globalThis as { __GOAL_INITIAL_TODOS__?: BootstrapTodo[] }
  ).__GOAL_INITIAL_TODOS__;

  if (!bootstrapTodos) {
    return [];
  }

  return bootstrapTodos.map((todo) => ({
    ...todo,
    completed: todo.completed ?? false
  }));
}

export function appendTodo(todos: ReadonlyArray<Todo>, label: string): Todo[] {
  return [
    ...todos,
    {
      id: `todo-${todos.length + 1}`,
      label,
      completed: false
    }
  ];
}

export function toggleTodo(todos: ReadonlyArray<Todo>, id: string): Todo[] {
  return todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          completed: !todo.completed
        }
      : todo
  );
}
