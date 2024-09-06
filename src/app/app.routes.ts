import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../domains/todo/routes'),
  },
  {
    path: '',
    loadChildren: () => import('../domains/app/routes'),
  },
];
