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
import { NotificationService } from '../../../../core/notification.service';
import { Dialog } from '@angular/cdk/dialog';
import { ProjectFormModalComponent } from '../../components/form-modal/project-form-modal.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-projects-page',
  imports: [FormsModule, CommonModule, ProjectsListComponent],
  templateUrl: './projects-page.html',
  styles: ``
})
export class ProjectsPage {
  private readonly projectService = inject(ProjectService);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(Dialog);

  protected pagedProjects!: PagedList<ProjectResponse>;
  protected projectTemplates: ProjectTemplateResponse[] = [];

  ngOnInit() {
    this.loadProjects();
    this.loadTemplates();
  }

  protected openProjectForm() {
    const dialogRef = this.dialog.open(ProjectFormModalComponent, {
      data: {
        projectTemplates: this.projectTemplates
      }
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.createProject(result as CreateProjectRequest);
      }
    });
  }

  protected createProject(project: CreateProjectRequest) {
    this.projectService.create(project).subscribe({
      next: (response) => {
        this.pagedProjects.items.push(response);
        this.pagedProjects.totalCount++;
        this.notificationService.showSuccess('Project created successfully!');
      },
      error: (error: ProblemDetails) => {
        console.error('Error creating project:', error);
      }
    });
  }

  protected confirmDeleteProject(projectId: string) {
    const project = this.pagedProjects.items.find(p => p.id === projectId);

    if (!project) {
      this.notificationService.showError('Project not found.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: 'Delete Project',
        message: `Are you sure you want to delete this project: <strong>${project?.name}</strong>?`
      }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.deleteProject(project);
      }
    })
  }

  private deleteProject(project: ProjectResponse) {
    this.projectService.delete(project.id).subscribe({
      next: () => {
        this.pagedProjects.items = this.pagedProjects.items.filter(p => p.id !== project.id);
        this.pagedProjects.totalCount--;
        this.notificationService.showSuccess('Project deleted successfully!');
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
