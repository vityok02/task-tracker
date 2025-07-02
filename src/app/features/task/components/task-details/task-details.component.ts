import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskResponse } from '../../models/task-response';
import { FormsModule } from '@angular/forms';
import { UpdateTaskRequest } from '../../models/update-task-request';

@Component({
  selector: 'app-task-details',
  imports: [DatePipe, FormsModule],
  templateUrl: './task-details.component.html',
  styles: ``
})
export class TaskDetailsComponent {
  readonly task = input.required<TaskResponse>();

  taskUpdated = output<UpdateTaskRequest>();

  protected isEditingName = false;
  protected editedName = '';

  protected isEditingDescription = false;
  protected editedDescription = '';

  protected startEditName() {
    this.editedName = this.task().name;
    this.isEditingName = true;
  }

  protected cancelEditName() {
    this.isEditingName = false;
  }

  protected saveName() {
    const updated: UpdateTaskRequest = {
      id: this.task().id,
      name: this.editedName,
      description: this.task().description,
      startDate: this.task().startDate?.toISOString(),
      endDate: this.task().endDate?.toISOString(),
      stateId: this.task().stateId,
    };

    this.isEditingName = false;

    this.taskUpdated.emit(updated);
  }

  protected startEditDescription() {
    this.editedDescription = this.task().description ?? '';
    this.isEditingDescription = true;
  }

  protected cancelEditDescription() {
    this.isEditingDescription = false;
  }

  protected saveDescription() {
    const updated: UpdateTaskRequest = {
      id: this.task().id,
      name: this.task().name,
      description: this.editedDescription,
      startDate: this.task().startDate?.toISOString(),
      endDate: this.task().endDate?.toISOString(),
      stateId: this.task().stateId,
    };

    this.isEditingDescription = false;
    this.taskUpdated.emit(updated);
  }

  getTextColor(bgColor: string): string {
    if (!bgColor) return '#000';
    const c = bgColor.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186 ? '#000' : '#fff';
  }
}
