import { checkIfUserExist, checkUserId } from "src/db/users";
import { Request, Response, NextFunction } from "express";
import authConfig from "./auth.config";
import jwt from "jsonwebtoken";

interface JWTData {
  id: any;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.cookies;
  if (!cookie) {
    return res.status(401).json({
      msg: "No cookie was found",
      success: false,
    });
  }
  const token = cookie.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "You are not authorized to do that",
    });
  }
  try {
    const decoded = jwt.verify(token, authConfig.secret);
    if (!decoded) return res.status(401).send({ message: "Unauthorized!" });
    await checkUserId({ id: (decoded as JWTData).id }).then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found" });
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).redirect("/login");
  }
}
