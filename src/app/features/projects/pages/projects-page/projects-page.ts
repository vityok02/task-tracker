import { Component } from '@angular/core';
import { ProjectService } from '../../project.service';
import { PagedList } from '../../models/paged-list';
import { ProjectResponse } from '../../models/project-response';
import { CreateProjectRequest } from '../../models/create-project-request';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-projects-page',
  imports: [FormsModule, ButtonModule],
  templateUrl: './projects-page.html',
  styles: ``
})
export class ProjectsPage {
  paginatedProjects!: PagedList<ProjectResponse>;

  newProject: CreateProjectRequest = {
    name: '',
    description: '',
    startDate: new Date(),
  }

  constructor(private readonly projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe({
      next: (projects) => {
        this.paginatedProjects = projects;
        console.log('Projects loaded:', projects);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  createProject() {
    this.projectService.create(this.newProject).subscribe({
      next: (project) => {
        console.log('Project created:', project);
        this.paginatedProjects.totalCount++;
        this.paginatedProjects.items.push(project);
      },
      error: (error) => {
        console.error('Error creating project:', error);
      }
    });
  }
}
