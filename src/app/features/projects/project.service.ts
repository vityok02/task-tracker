import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedList } from './models/paged-list';
import { ProjectResponse } from './models/project-response';
import { Observable } from 'rxjs';
import { CreateProjectRequest } from './models/create-project-request';
import { ProjectTemplateResponse } from './models/projectr-template-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.apiUrl + '/projects';
  private templatesUrl = environment.apiUrl + '/templates';
  
  constructor(private readonly httpClient: HttpClient) { }

  create(project: CreateProjectRequest): Observable<ProjectResponse> {
    return this.httpClient.post<ProjectResponse>(this.baseUrl, project);
  }

  getAll(): Observable<PagedList<ProjectResponse>> {
    return this.httpClient.get<PagedList<ProjectResponse>>(this.baseUrl);
  }

  getAllTemplates(): Observable<ProjectTemplateResponse[]> {
    return this.httpClient.get<ProjectTemplateResponse[]>(this.templatesUrl);
  }

  delete(projectId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${projectId}`);
  }
}
