import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'ngtodo-about',
  templateUrl: './about.component.html',
  styles: `
    :host {
      padding: 1rem 2rem;
    }
  `,
  standalone: true,
  imports: [MatListModule],
})
export class AboutComponent {}
