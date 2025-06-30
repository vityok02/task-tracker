import { inject, Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly toastr = inject(ToastrService);

  private lastMessages = new Set<string>();
  private toastTimeout = environment.notificationTimeout || 3000;

  showSuccess(message: string, title?: string): void {
    this.showOnce(`success:${title ?? ''}:${message}`, () => this.toastr.success(message, title));
  }

  showError(message: string, title?: string): void {
    this.showOnce(`error:${title ?? ''}:${message}`, () => this.toastr.error(message, title));
  }

  showInfo(message: string, title?: string): void {
    this.showOnce(`info:${title ?? ''}:${message}`, () => this.toastr.info(message, title));
  }

  showWarning(message: string, title?: string): void {
    this.showOnce(`warn:${title ?? ''}:${message}`, () => this.toastr.warning(message, title));
  }

  private showOnce(key: string, showFn: () => ActiveToast<any>) {
    if (this.lastMessages.has(key)) return;

    this.lastMessages.add(key);
    const toast = showFn();

    setTimeout(() => this.lastMessages.delete(key), this.toastTimeout);
  }
}
