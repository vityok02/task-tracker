export interface AuditableResponse {
  createdBy: string;
  createdByName: string;
  createdAt: Date;
  updatedBy: string | null;
  updatedByName: string | null;
  updatedAt: Date | null;
}