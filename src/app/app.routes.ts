import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module')
        .then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
  },
  {  
    path: 'error',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/error'
  }
];
