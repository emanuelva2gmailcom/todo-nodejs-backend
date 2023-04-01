import { SubtaskRepositoryImpl } from "./../repositorys/subtask.repository";
import express from "express";
import SubTaskEntity from "../models/subtask";
const subtaskRouter = express.Router();

const subtaskRepository = new SubtaskRepositoryImpl();

subtaskRouter.post("/subtasks", async (req, res, next) => {
  const subtask: SubTaskEntity = req.body;
  try {
    await subtaskRepository.createSubtask(subtask);
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

subtaskRouter.get("/subtasks", async(_, res, next) => {
  try {
    const items = await subtaskRepository.listAllSubtasks();
    res.status(200).json(items).send();
  } catch (e: any) {
    next(e);
  }
});

subtaskRouter.get("/subtasks/:id", async(req, res, next) => {
  const id: number = +req.params.id;
  try {
    const item = await subtaskRepository.getSubtask(id);
    res.status(200).json(item).send();
  } catch (e: any) {
    next(e);
  }
});

subtaskRouter.put("/subtasks/:id", async(req, res, next) => {
  const id: number = +req.params.id;
  const subtask: SubTaskEntity = req.body;
  try {
    await subtaskRepository.updateSubtask(id, subtask.text, subtask.checked);
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

subtaskRouter.delete("/subtasks/:id", async(req, res, next) => {
  const id: number = +req.params.id;
  try {
    await subtaskRepository.deleteSubtask(id);
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

export default subtaskRouter;
