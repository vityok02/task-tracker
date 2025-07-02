import { Component, input, output } from '@angular/core';
import { TaskFormComponent } from "../task-form/task-form.component";
import { StateModel } from '../../../state/models/state.model';
import { CreateTaskRequest } from '../../models/create-task-request';
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'app-state-column',
  imports: [TaskFormComponent, TaskItemComponent],
  templateUrl: './state-column.component.html',
  styles: ``
})
export class StateColumnComponent {
  public readonly state = input.required<StateModel>();

  public readonly taskSelected = output<string>();
  public readonly taskCreated = output<CreateTaskRequest>();
  public readonly taskDeleted = output<string>();

  public selectTask(taskId: string) {
    this.taskSelected.emit(taskId);
  }

  public createTask(task: CreateTaskRequest) {
    this.taskCreated.emit(task);
  }

  public deleteTask(taskId: string) {
    this.taskDeleted.emit(taskId);
  }
}
