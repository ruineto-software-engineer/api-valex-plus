import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (err.type === "unauthorized") {
    return res.sendStatus(401);
  } else if (err.type === "conflict") {
    return res.sendStatus(409);
  } else if (err.type === "not_found") {
    return res.sendStatus(404);
  } else if (err.type === "bad_request") {
    return res.sendStatus(400);
  }

  return res.sendStatus(500);
}
