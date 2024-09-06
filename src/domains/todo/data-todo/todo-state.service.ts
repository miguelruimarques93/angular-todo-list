import { effect, inject, Injectable, signal } from '@angular/core';
import { Todo, TodoStateEvent } from './todo.model';
import { TodoDataService } from './todo-data.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private readonly dataService = inject(TodoDataService);

  private readonly todoState = signal<Todo[]>(this.dataService.getAll());

  public readonly state = this.todoState.asReadonly();
  public readonly stateEvents$ = new Subject<TodoStateEvent>();

  constructor() {
    effect(() => {
      this.dataService.save(this.todoState());
    });
  }

  public addTodo(todo: Todo) {
    this.todoState.update(todos => [
      { ...todo, id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) },
      ...todos,
    ]);

    this.stateEvents$.next('create');
  }

  public removeTodo(id: number) {
    this.todoState.update(todos => todos.filter(_ => _.id !== id));
    this.stateEvents$.next('remove');
  }

  public updateTodo(id: number, newTodo: Todo) {
    this.todoState.update(todos =>
      todos.map(todo =>
        todo.id === id ? this.updateTodoFields(todo, newTodo) : todo
      )
    );
    this.stateEvents$.next('update');
  }

  private updateTodoFields(todo: Todo, newTodo: Todo) {
    todo.title = newTodo.title;
    todo.description = newTodo.description;

    return todo;
  }
}
