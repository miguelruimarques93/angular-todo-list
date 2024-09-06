import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TodoComponent } from '../todo/todo.component';
import { TodoStateService } from '../../data-todo';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'ngtodo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  imports: [MatListModule, TodoComponent, TodoFormComponent],
  standalone: true,
})
export class TodoListComponent {
  todos = inject(TodoStateService).state;
}
