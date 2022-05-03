import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function create(req: Request, res: Response) {
  const apiKey = req.headers["x-api-key"] as string;
  if (!apiKey) return res.sendStatus(401);

  const { employeeId, type } = req.body;
  await cardService.create(apiKey, employeeId, type);

  res.sendStatus(201);
}

export async function activate(req: Request, res: Response) {
  const { id } = req.params;

  const { cvc, password } = req.body;
  await cardService.activate(Number(id), cvc, password);

  res.sendStatus(200);
}
