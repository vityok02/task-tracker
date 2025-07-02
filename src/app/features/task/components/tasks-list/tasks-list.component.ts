import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { StateModel } from '../../../state/models/state.model';
import { CreateTaskRequest } from '../../models/create-task-request';
import { StateColumnComponent } from '../state-column/state-column.component';

@Component({
  selector: 'app-tasks-list',
  imports: [StateColumnComponent],
  templateUrl: './tasks-list.component.html',
  styles: ``
})
export class TasksListComponent {
  projectId = input.required<string>();
  states = input.required<StateModel[]>();

  taskSelected = output<string>();
  taskCreated = output<CreateTaskRequest>();
  taskDeleted = output<string>();

  selectTask(taskId: string) {
    this.taskSelected.emit(taskId);
  }

  createTask(task: CreateTaskRequest) {
    this.taskCreated.emit(task);
  }

  deleteTask(taskId: string) {
    this.taskDeleted.emit(taskId);
  }
}
