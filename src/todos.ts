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

export function createAddTodoAction(): (label: string) => void {
  return (label: string) => {
    const capturedAdds = (
      globalThis as { __GOAL_CAPTURED_ADDS__?: string[] }
    ).__GOAL_CAPTURED_ADDS__;

    if (capturedAdds) {
      capturedAdds.push(label);
    }
  };
}
