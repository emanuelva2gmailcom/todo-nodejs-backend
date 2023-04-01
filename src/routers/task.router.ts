import { TaskRepositoryImpl } from "./../repositorys/task.repository";
import express from "express";
import TaskEntity from "../models/subtask";
const taskRouter = express.Router();

const taskRepository = new TaskRepositoryImpl();

taskRouter.post("/tasks", async (req, res, next) => {
  const task: TaskEntity = req.body;
  try {
    await taskRepository.createTask(task, []);
    res
      .status(201)
      .json({
        message: "success",
      })
      .send();
  } catch (e: any) {
    next(e);
  }
});

taskRouter.get("/tasks", async (_, res, next) => {
  try {
    const items = await taskRepository.listAllTasks();
    res.status(200).json(items).send();
  } catch (e: any) {
    next(e);
  }
});

taskRouter.get("/tasks/:id", async (req, res, next) => {
  const id: number = +req.params.id;
  try {
    const item = await taskRepository.getTask(id);
    res.status(200).json(item).send();
  } catch (e: any) {
    next(e);
  }
});

taskRouter.put("/tasks/:id", async (req, res, next) => {
  const id: number = +req.params.id;
  const task: TaskEntity = req.body;
  try {
    await taskRepository.updateTask(id, task.text, task.checked);
    res
      .status(201)
      .json({
        message: "success",
      })
      .send();
  } catch (e: any) {
    next(e);
  }
});

taskRouter.delete("/tasks/:id", async (req, res, next) => {
  const id: number = +req.params.id;
  try {
    await taskRepository.deleteTask(id);
    res
      .status(200)
      .json({
        message: "success",
      })
      .send();
  } catch (e: any) {
    next(e);
  }
});

export default taskRouter;
