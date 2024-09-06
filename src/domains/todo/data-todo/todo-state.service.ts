import { effect, inject, Injectable, signal } from '@angular/core';
import { Todo } from './todo.model';
import { TodoDataService } from './todo-data.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private readonly dataService = inject(TodoDataService);

  private readonly todoState = signal<Todo[]>(this.dataService.getAll());

  public readonly state = this.todoState.asReadonly();

  constructor() {
    effect(() => {
      this.dataService.save(this.todoState());
    });
  }

  public addTodo(todo: Omit<Todo, 'id'>) {
    this.todoState.update(todos => [
      { ...todo, id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) },
      ...todos,
    ]);
  }

  public removeTodo(id: number) {
    this.todoState.update(todos => todos.filter(_ => _.id !== id));
  }

  public updateTodo(id: number, toUpdate: Todo) {
    this.todoState.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, ...toUpdate, id: todo.id } : todo
      )
    );
  }
}
