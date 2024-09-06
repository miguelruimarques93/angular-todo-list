import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

const LOCAL_STORAGE_TODO_KEY = 'NG_TODO_TODOS';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  public getAll(): Todo[] {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_KEY) ?? '[]');
  }

  public save(todos: Todo[]) {
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(todos));
  }
}
