export interface CreateProjectRequest {
  name: string;
  description: string;
  startDate: Date;
  templateId?: string;
}
