import { Routes } from '@angular/router';
import { RegisterPage } from './features/auth/pages/register-page/register-page';
import { ProjectsPage } from './features/projects/pages/projects-page/projects-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { TasksPageComponent } from './features/task/pages/tasks-page/tasks-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'projects',
        component: ProjectsPage
      },
      {
        path: 'projects/:projectId/tasks',
        component: TasksPageComponent
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterPage
      },
      {
        path: 'login',
        component: LoginPage
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
