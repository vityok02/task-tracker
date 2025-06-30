import { Injectable } from '@angular/core';
import { ErrorHandlerStrategy } from './error-handler-strategy';
import { ProblemDetails } from '../problem-details';

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorStrategy implements ErrorHandlerStrategy {
  handle(problemDetails: ProblemDetails): void {
    console.log("Validation error occurred.");
  }
}
