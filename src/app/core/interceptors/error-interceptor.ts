import { inject } from "@angular/core";
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http"
import { catchError, throwError } from "rxjs"
import { ProblemDetails } from "../error-handling/problem-details"
import { ServerUnavailableErrorStrategy } from "../error-handling/strategies/server-unavailable-error-strategy";
import { ErrorHandlerStrategyRegistryService } from "../error-handling/error-handler-strategy-registry.service";
import { ErrorType } from "../error-handling/error-types";

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const serverUnavailableErrorStrategy = inject(ServerUnavailableErrorStrategy);
  const registry = inject(ErrorHandlerStrategyRegistryService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.error("A network error occurred. The server may be unavailable.");

        const strategy = registry.getStrategy(ErrorType.ServerUnavailable);
        strategy.handle();

        return throwError(() => error);
      }

      if (isProblemDetails(error.error)) {
        const problem = error.error;
        const strategy = registry.getStrategy(problem.type);
        strategy.handle(problem);

        return throwError(() => error);
      }

      let strategy;

      switch (error.status) {
        case 401:
          strategy = registry.getStrategy(ErrorType.Unauthorized);
          break;
        case 403:
          strategy = registry.getStrategy(ErrorType.Forbidden);
          break;
      }

      strategy?.handle();

      return throwError(() => error);
    })
  );
}

function isProblemDetails(error: any): error is ProblemDetails {
  return error !== null && typeof error === 'object'
    && typeof error.type === 'string'
    && typeof error.title === 'string'
    && typeof error.status === 'number'
    && ('detail' in error)
    && ('instance' in error);
}
