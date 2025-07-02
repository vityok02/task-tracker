import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  private _states: { id: string; name: string }[] = [];

  @Input({ required: true }) projectId!: string;
  @Input({ required: true })
  set states(value: { id: string; name: string }[]) {
    this._states = value;
    if (this.form) {
      this.form.get('stateId')?.setValue(value[0]?.id || '');
    }
  }
  get states(): { id: string; name: string }[] {
    return this._states;
  }

  @Output() onTaskCreated = new EventEmitter<CreateTaskRequest>();

  protected form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      stateId: [this.states[0]?.id || '', Validators.required]
    });
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    const taskRequest: CreateTaskRequest = {
      name: this.form.value.name,
      stateId: this.form.value.stateId
    };

    this.form.reset();

    this.onTaskCreated.emit(taskRequest);
  }
}
