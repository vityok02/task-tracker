import { ErrorType } from "./error-types";

export interface ProblemDetails {
  type: ErrorType;
  title: string;
  status: number;
  detail: string | null;
  instance: string | null;
}
