import "express-async-errors";

import boom from "@hapi/boom";
import express from "express";
import pinoHttp from "pino-http";

import { errorMiddleware, notFoundMiddleware } from "./util/error";
import { logger } from "./util/logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

app.get("/api/health", (req, res) => res.send({ message: "OK" }));

app.use([notFoundMiddleware, errorMiddleware]);

export { app };
