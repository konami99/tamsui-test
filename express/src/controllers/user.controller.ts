import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, getUsers } from "../services/user.service";

export async function createUserHandler(
  req: Request,
  res: Response,
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}

export async function getUsersHandler(
  req: Request,
  res: Response,
) {
  try {
    const user = await getUsers();
    return res.send(user);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}