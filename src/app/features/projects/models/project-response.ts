import { AuditableResponse } from '../../../core/models/auditable-response';

export interface ProjectResponse extends AuditableResponse {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;

  //states
}
