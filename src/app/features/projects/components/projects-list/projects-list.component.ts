import { Component, Input } from '@angular/core';
import { ProjectResponse } from '../../models/project-response';
import { PagedList } from '../../models/paged-list';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  imports: [DatePipe],
  templateUrl: './projects-list.component.html',
  styles: ``
})
export class ProjectsListComponent {
  @Input() pagedList: PagedList<ProjectResponse> | null = null;
}
