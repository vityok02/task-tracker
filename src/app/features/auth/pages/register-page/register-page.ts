import { RegisterRequest } from './../../models/register-request';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.html',
  styles: ``
})
export class RegisterPage {
  userName = new FormControl();
  email = new FormControl();
  password = new FormControl();
  confirmedPassword = new FormControl();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  register() {
    if (this.password.value !== this.confirmedPassword.value) {
      return;
    }

    const registerRequest: RegisterRequest = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      confirmedPassword: this.confirmedPassword.value
    }

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        localStorage.setItem('auth-token', response.token.token);
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    })
  }
}
