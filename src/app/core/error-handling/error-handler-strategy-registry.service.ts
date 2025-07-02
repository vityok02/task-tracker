import { Injectable } from '@angular/core';
import { ErrorType } from './error-types';
import { ErrorHandlerStrategy } from './strategies/error-handler-strategy';
import { ForbiddenErrorStrategy } from './strategies/forbidden-error-strategy';
import { NotFoundErrorStrategy } from './strategies/not-found-error-strategy';
import { ValidationErrorStrategy } from './strategies/validation-error-strategy';
import { UnauthorizedErrorStrategy } from './strategies/unauthorized-error-strategy';
import { DefaultErrorStrategy } from './strategies/default-error-strategy';
import { ServerUnavailableErrorStrategy } from './strategies/server-unavailable-error-strategy';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerStrategyRegistryService {
  private readonly strategies: Map<ErrorType, ErrorHandlerStrategy>;

  constructor(
    forbidden: ForbiddenErrorStrategy,
    validation: ValidationErrorStrategy,
    notFound: NotFoundErrorStrategy,
    unauthorized: UnauthorizedErrorStrategy,
    serverUnavailable: ServerUnavailableErrorStrategy,
    defaultStrategy: DefaultErrorStrategy
  ) {
    this.strategies = new Map<ErrorType, ErrorHandlerStrategy>([
      [ErrorType.Forbidden, forbidden],
      [ErrorType.ValidationError, validation],
      [ErrorType.NotFound, notFound],
      [ErrorType.Unauthorized, unauthorized],
      [ErrorType.InvalidCredentials, defaultStrategy],
      [ErrorType.AlreadyExists, defaultStrategy],
      [ErrorType.InvalidToken, defaultStrategy],
      [ErrorType.InvalidOperation, defaultStrategy],
      [ErrorType.ServerUnavailable, serverUnavailable],
    ]);
  }

  getStrategy(type: ErrorType): ErrorHandlerStrategy {
    return this.strategies.get(type) ?? this.getFallback(type);
  }

  private getFallback(type: ErrorType): ErrorHandlerStrategy {
    console.error("Unhandled error type:", type);
    return {
      handle: () => { }
    };
  }
}
