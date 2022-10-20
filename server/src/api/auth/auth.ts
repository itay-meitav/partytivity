import express, { Request, Response } from "express";
import { changeUserStatus } from "../../db/users";
import jwt, { JwtPayload } from "jsonwebtoken";
import authConfig from "./auth.config";
const router = express.Router();

router.get("/confirm/:token", async (req: Request, res: Response) => {
  const token = req.params.token;
  try {
    const { email } = jwt.verify(token, authConfig.secret) as JwtPayload;
    await changeUserStatus(email).then(() => {
      return res.json({ message: "User is now active", success: true });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export default router;
