import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/services/auth.guard';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'public',
        pathMatch: 'full'
      },
      {
        path: 'public',
        loadChildren: () => import('./public/public.module').then(mod => mod.PublicModule)
      },
      {
        path: 'protected',
        loadChildren: () => import('./protected/protected.module').then(mod => mod.ProtectedModule),
        canActivate: [authGuard],
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/public',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
