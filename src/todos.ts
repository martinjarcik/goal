export type Todo = {
  id: string;
  label: string;
  completed: boolean;
};

export function createInitialTodos(): Todo[] {
  const seededTodos = (
    globalThis as typeof globalThis & {
      __TEST_TODOS__?: Array<{
        id: string;
        label: string;
        completed?: boolean;
      }>;
    }
  ).__TEST_TODOS__;

  if (!Array.isArray(seededTodos)) {
    return [];
  }

  return seededTodos.map((todo) => ({
    id: todo.id,
    label: todo.label,
    completed: todo.completed ?? false
  }));
}
