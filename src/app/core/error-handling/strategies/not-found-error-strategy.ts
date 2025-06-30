import { Injectable } from '@angular/core';
import { ErrorHandlerStrategy } from './error-handler-strategy';
import { ProblemDetails } from '../problem-details';

@Injectable({
  providedIn: 'root'
})
export class NotFoundErrorStrategy implements ErrorHandlerStrategy {
  handle(problemDetails: ProblemDetails): void {
    console.log("Resource not found.");
  }
}
