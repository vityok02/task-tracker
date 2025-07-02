import { AuditableResponse } from "../../../core/models/auditable-response";

export interface StateResponse extends AuditableResponse {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  sortOrder: number;
  projectId: string;
}
