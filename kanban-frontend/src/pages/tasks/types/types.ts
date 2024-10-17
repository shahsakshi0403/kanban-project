import { TaskStatus } from "../../../constants/status.enum";

export interface Task {
    id?:number;
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface TaskState {
    tasks: Task[];
}