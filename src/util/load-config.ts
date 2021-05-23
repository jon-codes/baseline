import dotenv from "dotenv";
import type { Schema } from "joi";

import { handle } from "./error";

export const loadConfig = (schema: Schema) => {
  dotenv.config();

  const { value, error } = schema.validate(process.env);
  if (error) {
    handle(new Error(`Invalid environment: ${error.message}`));
  }
  return value;
};
