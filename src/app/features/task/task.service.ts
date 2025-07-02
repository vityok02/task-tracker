import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { TaskResponse } from './models/task-response';
import { Observable } from 'rxjs/internal/Observable';
import { CreateTaskRequest } from './models/create-task-request';
import { UpdateTaskRequest } from './models/update-task-request';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly httpClient = inject(HttpClient);
  private url = environment.apiUrl + '/projects';

  create(projectId: string, task: CreateTaskRequest): Observable<TaskResponse> {
    return this.httpClient.post<TaskResponse>(`${this.url}/${projectId}/tasks`, task);
  }

  getAll(projectId: string): Observable<TaskResponse[]> {
    return this.httpClient.get<TaskResponse[]>(`${this.url}/${projectId}/tasks`)
      .pipe(
        map(tasks => tasks.map(task => ({
          ...task,
          description: task.description === null ? undefined : task.description,
          stateColor: task.stateColor === null ? undefined : task.stateColor,
          startDate: task.startDate ? new Date(task.startDate) : undefined,
          endDate: task.endDate ? new Date(task.endDate) : undefined,
        })))
      );
  }

  getById(projectId: string, taskId: string): Observable<TaskResponse> {
    return this.httpClient.get<TaskResponse>(`${this.url}/${projectId}/tasks/${taskId}`)
      .pipe(
        map(task => ({
          ...task,
          description: task.description === null ? undefined : task.description,
          stateColor: task.stateColor === null ? undefined : task.stateColor,
          startDate: task.startDate ? new Date(task.startDate) : undefined,
          endDate: task.endDate ? new Date(task.endDate) : undefined,
        }))
      );
  }

  update(projectId: string, taskId: string, task: UpdateTaskRequest): Observable<TaskResponse> {
    return this.httpClient.put<TaskResponse>(`${this.url}/${projectId}/tasks/${taskId}`, task);
  }

  delete(projectId: string, taskId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${projectId}/tasks/${taskId}`);
  }
}
