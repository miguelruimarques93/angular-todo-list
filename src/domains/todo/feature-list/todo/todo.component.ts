import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Todo, TodoStateService } from '../../data-todo';

@Component({
  selector: 'ngtodo-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon],
})
export class TodoComponent {
  private readonly todoStateService = inject(TodoStateService);

  todo = input.required<Todo>();

  handleTodoRemove() {
    this.todoStateService.removeTodo(this.todo().id);
  }
}
