import { Routes } from '@angular/router';
import { RegisterPage } from './features/auth/pages/register-page/register-page';
import { ProjectsPage } from './features/projects/pages/projects-page/projects-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'projects',
    component: ProjectsPage
  }
];
