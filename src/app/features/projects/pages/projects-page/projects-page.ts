import { Component, inject } from '@angular/core';
import { ProjectService } from '../../project.service';
import { PagedList } from '../../models/paged-list';
import { ProjectResponse } from '../../models/project-response';
import { CreateProjectRequest } from '../../models/create-project-request';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from '../../components/projects-list/projects-list.component';
import { ProjectTemplateResponse } from '../../models/projectr-template-response';
import { ProblemDetails } from '../../../../core/error-handling/problem-details';
import { ProjectFormComponent } from "../../components/project-form/project-form.component";

@Component({
  selector: 'app-projects-page',
  imports: [FormsModule, CommonModule, ProjectsListComponent, ProjectFormComponent],
  templateUrl: './projects-page.html',
  styles: ``
})
export class ProjectsPage {
  private readonly projectService = inject(ProjectService);

  protected pagedProjects!: PagedList<ProjectResponse>;
  protected projectTemplates: ProjectTemplateResponse[] = [];

  ngOnInit() {
    this.loadProjects();
    this.loadTemplates();
  }

  createProject(project: CreateProjectRequest) {
    this.projectService.create(project).subscribe({
      next: (response) => {
        this.pagedProjects.items.push(response);
        this.pagedProjects.totalCount++;
      },
      error: (error: ProblemDetails) => {
        console.error('Error creating project:', error);
      }
    });
  }

  deleteProject(projectId: string) {
    this.projectService.delete(projectId).subscribe({
      next: () => {
        this.pagedProjects.items = this.pagedProjects.items.filter(p => p.id !== projectId);
        this.pagedProjects.totalCount--;
      }
    });
  }

  private loadProjects() {
    this.projectService.getAll().subscribe({
      next: (projects) => {
        this.pagedProjects = projects;
      }
    });
  }

  private loadTemplates() {
    this.projectService.getAllTemplates().subscribe({
      next: (templates) => {
        this.projectTemplates = templates;
      }
    });
  }
}
