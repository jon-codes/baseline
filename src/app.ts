import "express-async-errors";

import express from "express";
import pinoHttp from "pino-http";

import { userRouter } from "./user/controller";
import { errorMiddleware, notFoundMiddleware } from "./util/error";
import { logger } from "./util/logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

app.get("/api/health", (req, res) => res.send({ message: "OK" }));

app.use("/api/user", userRouter);

app.use([notFoundMiddleware, errorMiddleware]);

export { app };
