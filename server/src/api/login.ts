import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  changeUserPass,
  checkIfUserExist,
  checkUserEmail,
  checkUserId,
} from "../db/users";
import authConfig from "./auth/auth.config";
import { sendResetEmail } from "./auth/nodemailer.config";
const router = express.Router();

interface JWTData {
  id: number;
}

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const check = await checkIfUserExist(username);

  if (check) {
    const token = jwt.sign({ id: check.id }, authConfig.secret, {
      expiresIn: "24h",
    });
    if (check.status == "active") {
      return bcrypt.compare(password, check.password, async (err, result) => {
        if (result) {
          res.cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
          return res.json({
            success: true,
          });
        } else {
          return res.status(401).json({
            message: "The password entered is incorrect",
            success: false,
          });
        }
      });
    } else {
      return res.status(401).json({
        message: "Pending Account. Please Verify Your Email!",
        accessToken: token,
        success: false,
      });
    }
  } else {
    return res.status(401).json({
      message: "This user does not exist",
      success: false,
    });
  }
});

router.post("/reset", async (res: Response, req: Request) => {
  const { email } = req.body;
  const check = await checkUserEmail(email);
  const token = jwt.sign({ id: check.id }, authConfig.secret, {
    expiresIn: "10m",
  });
  if (!check) {
    return res.status(401).json({
      message: "No user associated with this email",
      success: false,
    });
  }
  await sendResetEmail(email, token);
  return res.json({
    message: "Please check your email",
    success: true,
  });
});

router.get("/reset/new/:token", async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, authConfig.secret);
  if (!decoded) return res.status(401).json({ message: "Unauthorized!" });
  await checkUserId((decoded as JWTData).id).then(async (user) => {
    if (!user) {
      return res
        .status(401)
        .json({ message: "User Not found", success: false });
    }
    res.json({
      success: true,
    });
  });
});

router.post("/reset/new/:token", async (req: Request, res: Response) => {
  const token = req.params.token;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12);
  const decoded = jwt.verify(token, authConfig.secret);
  if (!decoded) return res.status(401).json({ message: "Unauthorized!" });
  await checkUserId((decoded as JWTData).id).then(async (user) => {
    if (!user) {
      return res.status(401).json({ message: "User Not found" });
    }
    if (password) {
      await changeUserPass({
        id: (decoded as JWTData).id,
        password: hashedPassword,
      })
        .then(() => {
          return res.json({ message: "Password changed" }).redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            message: "Internal Server Error",
            success: false,
          });
        });
    } else {
      return res.status(401).json({
        message: "make sure to send all the necessary fields",
        success: false,
      });
    }
  });
});

export default router;
