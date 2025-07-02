import { Component, Inject, inject, input, output } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-confirm-delete',
  imports: [],
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: { title: string; message: string },
    private dialogRef: DialogRef<boolean>
  ) {}
  protected confirm() {
    this.dialogRef.close(true);
  }

  protected cancel() {
    this.dialogRef.close(false);
  }
}
