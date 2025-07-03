import { CreateProjectRequest } from '../../models/create-project-request';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, viewChild } from '@angular/core';
import { ProjectFormComponent } from "../project-form/project-form.component";
import { ProjectTemplateResponse } from '../../models/projectr-template-response';

@Component({
  selector: 'app-form-modal',
  imports: [ProjectFormComponent],
  templateUrl: './project-form-modal.component.html',
  styles: ``
})
export class ProjectFormModalComponent {
  protected readonly formComponent = viewChild(ProjectFormComponent);

  constructor(
    @Inject(DIALOG_DATA) public data: { projectTemplates: ProjectTemplateResponse[] },
    private dialogRef: DialogRef<CreateProjectRequest>
  ) { }

  protected submit() {
    this.formComponent()?.createProject();
  }

  protected createProject(project: CreateProjectRequest) {
    this.dialogRef.close(project);
  }

  protected cancel() {
    this.dialogRef.close();
  }
}
