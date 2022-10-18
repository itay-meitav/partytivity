import express, { Request, Response } from "express";
import { changeUserStatus } from "../../db/users";
import jwt from "jsonwebtoken";
import authConfig from "./auth.config";
const router = express.Router();

router.get("/confirm/:token", async (req: Request, res: Response) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, authConfig.secret);
    await changeUserStatus(decoded as string).then(() => {
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
