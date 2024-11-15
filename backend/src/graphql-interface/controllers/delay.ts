import { RequestHandler } from "express";

export const delayController: RequestHandler = async (_req, _res, next) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(next());
    }, 0);
  });
};
