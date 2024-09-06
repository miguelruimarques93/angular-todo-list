import { Component, computed, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TodoStateService } from '../../data-todo';

@Component({
  selector: 'ngtodo-home-button',
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.scss',
  standalone: true,
  imports: [RouterModule, MatBadgeModule, MatButtonModule, MatIconModule],
  providers: [TodoStateService],
})
export class HomeButtonComponent {
  private readonly todos = inject(TodoStateService).state;
  readonly numTodos = computed(() => this.todos().length);
}
