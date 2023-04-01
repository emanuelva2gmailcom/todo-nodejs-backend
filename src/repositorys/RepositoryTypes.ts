import {
  SubtaskDatasource,
  TaskDatasource,
} from "../datasources/DatasourceTypes";
import SubTaskEntity from "../models/subtask";
import TaskEntity from "../models/task";

export interface TaskRepository {
  readonly datasource: TaskDatasource;
  listAllTasks: () => Promise<TaskEntity[]>;
  createTask: (
    task: TaskEntity,
    subtasks: SubTaskEntity[]
  ) => Promise<TaskEntity>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (id: number, text: string, checked: boolean) => Promise<void>;
  getTask: (id: number) => Promise<TaskEntity>;
}

export interface SubtaskRepository {
  readonly datasource: SubtaskDatasource;
  listAllSubtasks: () => Promise<SubTaskEntity[]>;
  createSubtask: (subtask: SubTaskEntity) => Promise<SubTaskEntity>;
  deleteSubtask: (id: number) => Promise<void>;
  updateSubtask: (id: number, text: string, checked: boolean) => Promise<void>;
  getSubtask: (id: number) => Promise<SubTaskEntity>;
}
