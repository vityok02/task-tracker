import { TaskResponse } from "../../task/models/task-response";
import { StateResponse } from "./state-response";

export interface StateModel extends StateResponse {
  tasks: TaskResponse[];
}
