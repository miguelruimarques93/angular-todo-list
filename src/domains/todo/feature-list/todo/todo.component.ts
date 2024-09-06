import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private readonly todoStateService = inject(TodoStateService);

  @Input()
  todo!: Todo;

  @Output()
  edit = new EventEmitter<void>();

  handleTodoEdit() {
    this.edit.emit();
  }

  handleTodoRemove() {
    this.todoStateService.removeTodo(this.todo.id!);
  }
}
