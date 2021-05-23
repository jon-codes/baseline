import dotenv from "dotenv";
import type { Schema } from "joi";

import { logger } from "./logger";

export const loadConfig = (schema: Schema) => {
  dotenv.config();

  const { value, error } = schema.validate(process.env);
  if (error) {
    logger.fatal(new Error(`Invalid environment: ${error.message}`));
  }
  return value;
};
