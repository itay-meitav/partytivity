import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { checkUserId } from "src/db/users";
import authConfig from "../auth/auth.config";
import { isAuthenticated } from "../auth/authMiddle";
const router = express.Router();

interface JWTData {
  id: any;
}

router.get("/", isAuthenticated, async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, authConfig.secret);
});
