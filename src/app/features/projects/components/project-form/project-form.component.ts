import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProjectRequest } from '../../models/create-project-request';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styles: ``
})
export class ProjectFormComponent {
  @Output() projectCreated = new EventEmitter<CreateProjectRequest>();
  
  projectForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly projectService: ProjectService
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [new Date()],
    })
  }

  createProject() {
    if (this.projectForm.invalid) {
      // TODO: handle error
      return;
    }

    this.projectCreated.emit(this.projectForm.value);
  }
}
