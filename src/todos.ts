export type Todo = {
  id: string;
  label: string;
};

export function createInitialTodos(): Todo[] {
  const seededTodos = (
    globalThis as typeof globalThis & {
      __TEST_TODOS__?: Todo[];
    }
  ).__TEST_TODOS__;

  return Array.isArray(seededTodos) ? seededTodos : [];
}
