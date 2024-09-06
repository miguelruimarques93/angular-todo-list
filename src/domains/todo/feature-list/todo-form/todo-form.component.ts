import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Todo, TodoStateService } from '../../data-todo';

@Component({
  selector: 'ngtodo-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class TodoFormComponent {
  private readonly todoStateService = inject(TodoStateService);
  private readonly fB = inject(FormBuilder).nonNullable;

  formMode: 'create' | 'edit' = 'create';
  todoId: number | null = null;

  readonly form = this.fB.group({
    title: this.fB.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    description: this.fB.control(''),
  });

  editTodo(todo: Todo) {
    this.formMode = 'edit';
    this.todoId = todo.id!;
    this.form.patchValue(todo);
  }

  handleFormSubmission(todoForm: FormGroupDirective) {
    if (this.form.valid) {
      const formValue = this.form.value;

      if (this.formMode === 'create') {
        this.todoStateService.addTodo({
          title: formValue.title!,
          description: formValue.description,
        });
      } else {
        this.todoStateService.updateTodo(this.todoId!, {
          title: formValue.title!,
          description: formValue.description,
        });

        this.formMode = 'create';
        this.todoId = null;
      }
      todoForm.resetForm();
    }
  }
}
