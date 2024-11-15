import { RequestHandler } from "express";
import { Logger } from "../../utils/logger.js";

export const notFoundController: RequestHandler = (req, res, _next) => {
  Logger.warn(`Not found route.`, { url: req.url });
  res.status(404).send();
};
