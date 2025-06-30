import { ProblemDetails } from '../problem-details';

export interface ErrorHandlerStrategy {
  handle(problemDetails?: ProblemDetails): void;
}
