export interface CreateTaskRequest {
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  stateId: string;
}
