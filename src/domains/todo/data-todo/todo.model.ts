export interface Todo {
  id?: number;
  title: string;
  description?: string;
}

export type TodoStateEvent = 'create' | 'update' | 'remove';
