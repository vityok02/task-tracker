import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedList } from './models/paged-list';
import { ProjectResponse } from './models/project-response';
import { Observable } from 'rxjs';
import { CreateProjectRequest } from './models/create-project-request';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly url = 'https://localhost:5001/projects';

  constructor(private readonly httpClient: HttpClient) { }

  create(project: CreateProjectRequest): Observable<ProjectResponse> {
    return this.httpClient.post<ProjectResponse>(this.url, project);
  }

  getAll(): Observable<PagedList<ProjectResponse>> {
    return this.httpClient.get<PagedList<ProjectResponse>>(this.url);
  }
}
