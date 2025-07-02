import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }
}
