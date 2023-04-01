import { PrimaTaskDatasource } from "./../datasources/prisma.datasource";
import TaskEntity from "../models/task";
import { TaskRepository } from "./RepositoryTypes";
import SubTaskEntity from "../models/subtask";

export class TaskRepositoryImpl implements TaskRepository {
  readonly datasource = new PrimaTaskDatasource();

  async listAllTasks() {
    return await this.datasource.listAllTasks();
  }

  async createTask(task: TaskEntity, subtasks: SubTaskEntity[]) {
    return await this.datasource.createTask(task, subtasks)
  }

  async deleteTask(id: number) {
    return await this.datasource.deleteTask(id);
  }

  async updateTask(id: number, text: string, checked: boolean) {
    return await this.datasource.updateTask(id, text, checked);
  }

  async getTask(id: number) {
    return await this.datasource.getTask(id);
  }
}
