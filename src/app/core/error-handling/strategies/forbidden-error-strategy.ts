import { Injectable } from '@angular/core';
import { ErrorHandlerStrategy } from './error-handler-strategy';
import { ProblemDetails } from '../problem-details';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenErrorStrategy implements ErrorHandlerStrategy {
  handle(problemDetails: ProblemDetails): void {
    console.log("Access forbidden.");
  }
}
