export type Todo = {
  id: string;
  label: string;
  completed: boolean;
};

export function createInitialTodos(): Todo[] {
  return [];
}
