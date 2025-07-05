import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from './models/user-response';
import { Observable } from 'rxjs';
import { AvatarResponse } from './models/avatar-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.apiUrl + '/users';

  private readonly httpClient = inject(HttpClient);

  getById(id: string): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${this.url}/${id}`);
  }

  searchByName(name: string): Observable<UserResponse[]> {
    return this.httpClient.get<UserResponse[]>(`${this.url}/search`, {
      params: { name }
    });
  }

  uploadAvatar(file: File): Observable<AvatarResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<AvatarResponse>(`${this.url}/avatar`, formData);
  }
}
