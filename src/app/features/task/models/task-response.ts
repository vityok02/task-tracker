import { AuditableResponse } from "../../../core/models/auditable-response";

export interface TaskResponse extends AuditableResponse {
  id: string;
  name: string;
  description?: string;
  sortOrder: number;
  projectId: string;
  projectName: string;
  stateId: string;
  stateName: string;
  stateColor?: string;
  startDate?: Date;
  endDate?: Date;
  tags: TagResponse[];
}

export interface TagResponse extends AuditableResponse {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
  projectId: string;
}

