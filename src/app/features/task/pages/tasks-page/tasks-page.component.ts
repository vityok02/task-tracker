import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { combineLatest } from 'rxjs';
import { CreateTaskRequest } from '../../models/create-task-request';
import { TaskService } from '../../task.service';
import { StateService } from '../../../state/state.service';
import { StateModel } from '../../../state/models/state.model';
import { TasksListComponent } from "../../components/tasks-list/tasks-list.component";
import { DrawerComponent } from "../../../../shared/components/drawer/drawer.component";
import { TaskDetailsComponent } from "../../components/task-details/task-details.component";
import { TaskResponse } from '../../models/task-response';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { NotificationService } from '../../../../core/notification.service';
import { UpdateTaskRequest } from '../../models/update-task-request';

@Component({
  selector: 'app-tasks-page',
  imports: [TasksListComponent, DrawerComponent, TaskDetailsComponent, DialogModule],
  templateUrl: './tasks-page.component.html',
  styles: ``
})
export class TasksPageComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly stateService = inject(StateService);
  private readonly dialog = inject(Dialog);
  private readonly notificationService = inject(NotificationService);

  protected projectId = input.required<string>();

  protected states = signal<StateModel[]>([]);
  protected selectedTask = signal<TaskResponse | null>(null);
  protected isDetailsOpen = signal<boolean>(false);

  ngOnInit() {
    this.loadData();
  }

  protected openDetails(taskId: string) {
    this.loadTaskDetails(taskId);
    this.isDetailsOpen.set(true);
  }

  protected closeDetails() {
    this.isDetailsOpen.set(false);
    this.selectedTask.set(null);
  }

  protected confirmDeleteTask(taskId: string) {
    const task = this.states()
      .flatMap(state => state.tasks)
      .find(t => t.id === taskId);

    if (!task) {
      this.notificationService.showError('Task not found.');
      return;
    }

    const ref = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: 'Delete Task',
        message: `Are you sure you want to delete this task: <strong>${task?.name}</strong>?`
      }
    });

    ref.closed.subscribe(result => {
      if (result) {
        this.deleteTask(task!);
      }
    });
  }

  protected createTask(taskRequest: CreateTaskRequest) {
    this.taskService.create(this.projectId(), taskRequest).subscribe({
      next: task => {
        this.states.update(states =>
          states.map(state => {
            if (state.id === task.stateId) {
              return {
                ...state,
                tasks: [...state.tasks, task]
              };
            }
            return state;
          })
        );
      }
    });
  }

  protected updateTask(task: UpdateTaskRequest) {
    this.taskService.update(this.projectId(), task.id, task).subscribe({
      next: updatedTask => {
        this.states.update(states =>
          states.map(state => {
            if (state.tasks.some(t => t.id === updatedTask.id)) {
              return {
                ...state,
                tasks: state.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
              };
            }
            return state;
          })
        );
        this.selectedTask.set(updatedTask);
        this.notificationService.showSuccess(`Task "${updatedTask.name}" updated successfully.`);
      }
    });
  }

  private deleteTask(task: TaskResponse) {
    this.taskService.delete(this.projectId(), task.id).subscribe({
      next: () => {
        this.states.update(states =>
          states.map(state => {
            if (state.tasks.some(t => t.id === task.id)) {
              return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== task.id)
              };
            }
            return state;
          })
        );

        this.notificationService.showSuccess(`Task "${task.name}" deleted successfully.`);
      }
    });
  }

  private loadTaskDetails(taskId: string) {
    this.taskService.getById(this.projectId(), taskId)
      .subscribe({
        next: task => {
          this.selectedTask.set(task);
        }
      });
  }

  private loadData() {
    combineLatest([
      this.stateService.getStates(this.projectId()),
      this.taskService.getAll(this.projectId())
    ]).subscribe(([states, tasks]) => {
      this.states
        .set(states
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(state => ({
            ...state,
            tasks: tasks
              .filter(task => task.stateId === state.id)
              .sort((a, b) => a.sortOrder - b.sortOrder)
          }))
        );
    });
  }
}
