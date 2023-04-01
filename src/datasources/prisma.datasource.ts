import { Prisma, PrismaClient } from "@prisma/client";
import SubTaskEntity from "../models/subtask";
import TaskEntity from "../models/task";
import AppError from "../utils/AppError";
import { SubtaskDatasource, TaskDatasource } from "./DatasourceTypes";

const prisma = new PrismaClient();

const catchHandler = (e: any) => {
  if (e instanceof Prisma.PrismaClientRustPanicError) {
    throw new AppError(500, "O servidor caiu, tente novamente mais tarde.");
  }
  if (e instanceof Prisma.PrismaClientInitializationError) {
    throw new AppError(500, "Ocorreu um erro ao inicializar os dados.");
  }
  if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new AppError(500, "Ocorreu um erro desconhecido no servidor.");
  }
  if (e instanceof Prisma.PrismaClientValidationError) {
    throw new AppError(
      500,
      "Ocorreu um erro de validade dos dados, verifique se os dados estão sendo passados corretamente."
    );
  }
  console.log(typeof e);
  console.log("aaaaaaaaaaaaaaaaaaaa");
  throw new AppError(500, "Internal Error");
};

// ==========================================================================
export class PrimaTaskDatasource implements TaskDatasource {
  async listAllTasks() {
    try {
      const allTasks = await prisma.tasks.findMany();
      return allTasks;
    } catch (e: any) {
      throw catchHandler(e);
    }
  }

  async createTask(task: TaskEntity, subtasks: SubTaskEntity[]) {
    let taskInput: Prisma.TasksCreateInput;

    if (subtasks) {
      taskInput = {
        ...task,
        subtasks: {
          createMany: { data: subtasks },
        },
      };
    } else {
      taskInput = {
        ...task,
        subtasks: {},
      };
    }

    try {
      const createTask = await prisma.tasks.create({ data: taskInput });

      return createTask as TaskEntity;
    } catch (e: any) {
      throw catchHandler(e);
    }
  }

  async deleteTask(id: number) {
    try {
      await prisma.tasks.delete({
        where: {
          id: id,
        },
      });
    } catch (e: any) {
      throw catchHandler(e);
    }
  }

  async updateTask(id: number, text: string, checked: boolean) {
    try {
      await prisma.tasks.update({
        where: {
          id,
        },
        data: {
          text,
          checked,
        },
      });
    } catch (e: any) {
      throw catchHandler(e);
    }
  }

  async getTask(id: number) {
    try {
      const task = await prisma.tasks.findUnique({
        where: {
          id,
        },
      });
      return task as TaskEntity;
    } catch (e: any) {
      throw catchHandler(e);
    }
  }
}

// ==========================================================================
export class PrimaSubtaskDatasource implements SubtaskDatasource {
  async listAllSubtasks() {
    try {
      const allSubtasks = await prisma.subtasks.findMany();
      return allSubtasks as SubTaskEntity[];
    } catch (e: any) {
      throw catchHandler(e);
    }
  }

  async createSubtask(task: SubTaskEntity) {
    let subtaskInput: Prisma.SubtasksCreateInput;

    subtaskInput = task;

    try {
      const createSubtask = await prisma.subtasks.create({
        data: subtaskInput,
      });

      return createSubtask as SubTaskEntity;
    } catch (e: any) {
      throw catchHandler(e);
    }
  }

  async deleteSubtask(id: number) {
    try {
      await prisma.subtasks.delete({
        where: {
          id: id,
        },
      });
    } catch (e: any) {
      throw catchHandler(e);
    }
  }

  async updateSubtask(id: number, text: string, checked: boolean) {
    try {
      await prisma.subtasks.update({
        where: {
          id,
        },
        data: {
          text,
          checked,
        },
      });
    } catch (e: any) {
      throw catchHandler(e);
    }
  }

  async getSubtask(id: number) {
    // TODO: implementar o código
    try {
      const subtask = await prisma.subtasks.findUnique({
        where: {
          id,
        },
      });
      return subtask as SubTaskEntity;
    } catch (e: any) {
      throw catchHandler(e);
    }
  }
}
