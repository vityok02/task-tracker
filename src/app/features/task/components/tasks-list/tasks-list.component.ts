import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { StateModel } from '../../../state/models/state.model';

@Component({
  selector: 'app-tasks-list',
  imports: [],
  templateUrl: './tasks-list.component.html',
  styles: ``
})
export class TasksListComponent {
  states = input.required<StateModel[]>();

  taskSelected = output<string>();
  taskDeleted = output<string>();

  selectTask(taskId: string) {
    this.taskSelected.emit(taskId);
  }

  deleteTask(taskId: string) {
    this.taskDeleted.emit(taskId);
  }
}
