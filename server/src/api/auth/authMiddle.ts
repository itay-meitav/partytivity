import { checkIfUserExist, checkUserId } from "../../db/users";
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
    return res
      .status(404)
      .json({
        message: "No cookie was found",
        success: false,
      })
      .redirect("/login");
  }
  const token = cookie.token;
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: "You are not authorized to do that",
      })
      .redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, authConfig.secret);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized!", success: false });
    await checkUserId((decoded as JWTData).id).then(async (user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "User Not found", success: false })
          .redirect("/login");
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
      })
      .redirect("/login");
  }
}
