import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { ProjectResponse } from '../../models/project-response';
import { PagedList } from '../../models/paged-list';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects-list',
  imports: [DatePipe, RouterModule],
  templateUrl: './projects-list.component.html',
  styles: ``
})
export class ProjectsListComponent {
  pagedList = input.required<PagedList<ProjectResponse>>();
  onDeleteProject = output<string>();

  deleteProject(projectId: string) {
    this.onDeleteProject.emit(projectId);
  }
}
