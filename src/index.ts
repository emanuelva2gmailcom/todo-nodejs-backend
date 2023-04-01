import { appErrorhandler } from "./utils/AppErrorHandler";
import express from "express";
import cors from "cors";
import taskRouter from "./routers/task.router";
import subtaskRouter from "./routers/subtask.router";
import { Exception404 } from "./utils/Exception404";
// Porta do servidor
const PORT = process.env.PORT || 4000;
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || "http://localhost";
// App Express
const app = express();
// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Endpoint raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});
// Cors
app.use(
  cors({
    origin: [process.env.ORIGIN_URL || "http://localhost:3000"],
  })
);
// Rotas
app.use("/api", taskRouter);
app.use("/api", subtaskRouter);
// UNHANDLED ROUTE
app.all("/*", Exception404);
// GLOBAL ERROR HANDLER
app.use(appErrorhandler);
// Inicia o sevidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
