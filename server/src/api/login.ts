import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkIfUserExist } from "src/db/users";
import authConfig from "./auth/auth.config";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const check = await checkIfUserExist(username);

  if (check) {
    const token = jwt.sign({ id: check.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });
    if (check.status == "pending") {
      return bcrypt.compare(password, check.password, (err, result) => {
        if (result) {
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
