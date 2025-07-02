import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateResponse } from './models/state-response';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly httpClient = inject(HttpClient);
  private url = environment.apiUrl + '/projects';

  getStates(projectId: string): Observable<StateResponse[]> {
    return this.httpClient.get<StateResponse[]>(`${this.url}/${projectId}/states`);
  }
}
