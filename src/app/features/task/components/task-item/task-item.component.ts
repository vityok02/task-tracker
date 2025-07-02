import { Component, input, output } from '@angular/core';
import { TaskResponse } from '../../models/task-response';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styles: ``
})
export class TaskItemComponent {
  public readonly task = input.required<TaskResponse>();

  public readonly taskSelected = output<string>();
  public readonly taskDeleted = output<string>();

  public selectTask(taskId: string) {
    this.taskSelected.emit(taskId);
  }

  public deleteTask(taskId: string) {
    this.taskDeleted.emit(taskId);
  }
}
