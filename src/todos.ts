export type Todo = {
  id: string;
  label: string;
  completed: boolean;
};

type BootstrapTodo = Pick<Todo, "id" | "label">;

export function createInitialTodos(): Todo[] {
  const bootstrapTodos = (
    globalThis as { __GOAL_INITIAL_TODOS__?: BootstrapTodo[] }
  ).__GOAL_INITIAL_TODOS__;

  if (!bootstrapTodos) {
    return [];
  }

  return bootstrapTodos.map((todo) => ({
    ...todo,
    completed: false
  }));
}
