import { Injectable } from '@angular/core';
import { ProblemDetails } from '../problem-details';
import { ErrorHandlerStrategy } from './error-handler-strategy';

@Injectable({
  providedIn: 'root'
})
export class DefaultErrorStrategy implements ErrorHandlerStrategy {
  handle(problemDetails: ProblemDetails): void {
    console.error("An unexpected error occurred:", problemDetails);
  }
}
