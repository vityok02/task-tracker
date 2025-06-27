import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from './models/register-request';
import { AuthResponse } from './models/auth-response';
import { LoginRequest } from './models/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'https://localhost:5001';

  constructor(private readonly httpClient: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.url}/register`, registerRequest)
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.url}/login`, loginRequest)
  }
}
