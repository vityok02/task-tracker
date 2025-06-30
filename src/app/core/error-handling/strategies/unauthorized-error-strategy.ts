import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorHandlerStrategy } from "./error-handler-strategy";
import { ProblemDetails } from "../problem-details";

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedErrorStrategy implements ErrorHandlerStrategy {
  private readonly router = inject(Router);

  handle(problemDetails: ProblemDetails): void {
    this.router.navigate(['/login']);
  }
}
