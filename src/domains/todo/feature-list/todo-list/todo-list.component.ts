import { Component, Signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Todo, TodoStateEvent, TodoStateService } from '../../data-todo';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoComponent } from '../todo/todo.component';
import { MatDividerModule } from '@angular/material/divider';
import { ToastrService } from 'ngx-toastr';

const TODO_EVENT_MESSAGES: { [key in TodoStateEvent]: string } = {
  create: 'Todo created',
  update: 'Todo updated',
  remove: 'Todo removed',
};

@Component({
  selector: 'ngtodo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  imports: [MatListModule, TodoComponent, TodoFormComponent, MatDividerModule],
  standalone: true,
})
export class TodoListComponent {
  todos: Signal<Todo[]>;

  constructor(
    private readonly todoStateService: TodoStateService,
    private readonly toastrService: ToastrService
  ) {
    this.todos = this.todoStateService.state;

    this.todoStateService.stateEvents$.subscribe(event => {
      this.toastrService.success(TODO_EVENT_MESSAGES[event]);
    });
  }
}
