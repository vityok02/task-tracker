import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styles: ``
})
export class LoginPage {
  email = new FormControl();
  password = new FormControl();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  login() {
    const loginRequest: LoginRequest = {
      email: this.email.value,
      password: this.password.value
    }

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('auth-token', response.token.token);
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
