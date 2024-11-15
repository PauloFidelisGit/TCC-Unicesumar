import { ErrorRequestHandler } from "express";
import { Logger } from "../../utils/logger.js";
import { INTERFACE_ERRORS } from "../enums/INTERFACE_ERRORS.js";

export const errorController: ErrorRequestHandler = (err, _req, res, _next) => {
  Logger.error("ErrorController:", { err });

  switch (true) {
    case err?.["extensions"]?.["code"] === INTERFACE_ERRORS.UNAUTHORIZED_ERROR:
      res.status(401).json(err);
      break;
    default:
      res.status(500).send("Internal server error.");
      break;
  }
};
