export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;

  createdBy: string;
  createdByName: string;
  createdAt: Date;

  updatedBy: string | null;
  updatedByName: string | null;
  updatedAt: Date | null;

  //states
}
