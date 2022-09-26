import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkIfUserExist, checkUserId } from "src/db/users";
import authConfig from "./auth/auth.config";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const check = await checkIfUserExist(username);

  if (check) {
    const token = jwt.sign({ id: check.id }, authConfig.secret, {
      expiresIn: "10m",
    });
    if (check.status == "active") {
      return bcrypt.compare(password, check.password, async (err, result) => {
        if (result) {
          res.cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            secure: true,
          });
          return res.json({
            success: true,
          });
        } else {
          return res.json({
            message: "The password entered is incorrect",
            success: false,
          });
        }
      });
    } else {
      return res.json({
        message: "Pending Account. Please Verify Your Email!",
        accessToken: token,
        success: false,
      });
    }
  } else {
    return res.json({
      message: "This user does not exist",
      success: false,
    });
  }
});

export default router;
