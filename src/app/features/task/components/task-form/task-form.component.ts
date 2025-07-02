import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTaskRequest } from '../../models/create-task-request';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styles: ``
})
export class TaskFormComponent implements OnInit {
  private readonly fb: FormBuilder = new FormBuilder();

  public stateId = input.required<string>();

  public taskCreated = output<CreateTaskRequest>();

  public blur() {
    console.log('Form blurred');

  }

  public form!: FormGroup;
  public isFormVisible: boolean = false;

  public ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  public showForm() {
    this.isFormVisible = true;
  }

  public hideForm() {
    this.isFormVisible = false;
    this.form.reset();
  }

  public create() {
    if (this.form.invalid) {
      return;
    }

    const taskRequest: CreateTaskRequest = {
      name: this.form.value.name,
      stateId: this.stateId()
    };

    this.taskCreated.emit(taskRequest);
    this.hideForm();
  }
}
