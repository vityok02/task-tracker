import { ErrorHandlerStrategy } from './error-handler-strategy';
import { NotificationService } from '../../notification.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerUnavailableErrorStrategy implements ErrorHandlerStrategy {
  private readonly notification = inject(NotificationService);

  handle(): void {
    this.notification.showError("Server is currently unavailable. Please try again later.");
  }
}
