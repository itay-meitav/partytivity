import { Request, Response, NextFunction } from "express";
import authConfig from "./auth.config";
import jwt from "jsonwebtoken";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.cookies.token;
  if (cookie) {
    try {
      jwt.verify(cookie, authConfig.secret);
      return next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  return res.status(401).json({
    success: false,
    message: "You are not authorized to do that",
  });
}
