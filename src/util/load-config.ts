import dotenv from "dotenv";
import type { Schema } from "joi";

import type { Env } from "../config";
import { handle } from "./error";

export const loadConfig = (schema: Schema): Env => {
  dotenv.config({ path: __dirname + "/../../.env" });

  const { value, error } = schema.validate(process.env);
  if (error) {
    handle(new Error(`Invalid environment: ${error.message}`));
  }
  return value;
};
