import { PrimaSubtaskDatasource } from "./../datasources/prisma.datasource";
import { SubtaskRepository } from "./RepositoryTypes";
import SubTaskEntity from "../models/subtask";

export class SubtaskRepositoryImpl implements SubtaskRepository {
  readonly datasource = new PrimaSubtaskDatasource();

  async listAllSubtasks() {
    return await this.datasource.listAllSubtasks();
  }

  async createSubtask(task: SubTaskEntity) {
    return await this.datasource.createSubtask(task)
  }

  async deleteSubtask(id: number) {
    return await this.datasource.deleteSubtask(id);
  }

  async updateSubtask(id: number, text: string, checked: boolean) {
    return await this.datasource.updateSubtask(id, text, checked);
  }

  async getSubtask(id: number) {
    return await this.datasource.getSubtask(id);
  }
}
