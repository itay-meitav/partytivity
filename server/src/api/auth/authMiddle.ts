import { checkIfUserExist } from "src/db/users";
import { Request, Response, NextFunction } from "express";

export async function checkStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let username = req.body.username;
  const check = await checkIfUserExist({ username: username });
  if (!check) {
    return res.status(403).send({ message: "User Not found" });
  }
  if (check.confirmationCode == "pending") {
  }
  next();
}
