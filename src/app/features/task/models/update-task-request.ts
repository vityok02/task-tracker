export interface UpdateTaskRequest {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  stateId: string;
}
