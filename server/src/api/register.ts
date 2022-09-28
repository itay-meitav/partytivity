import express, { Request, Response } from "express";
import { addUser, checkIfUserExist } from "../db/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "./auth/auth.config";
import { sendConfirmationEmail } from "./auth/nodemailer.config";
const router = express.Router();

router.post("/", async (res: Response, req: Request) => {
  const { username, password, email } = req.body;
  const token = jwt.sign({ email: email }, authConfig.secret, {
    expiresIn: "10m",
  });
  const check = await checkIfUserExist(username);
  if (!check) {
    if (username && password && email) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await addUser({
          username: username,
          password: hashedPassword,
          email: email,
        });
        await sendConfirmationEmail(username, email, token);
        return res.status(200).json({
          message: "User was registered successfully! Please check your email",
          success: true,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          message: "something went wrong please try again later",
          success: false,
        });
      }
    } else {
      return res.status(401).json({
        message: "make sure to send all the necessary fields",
        success: false,
      });
    }
  } else {
    return res.status(401).json({
      message: "This username already exists",
      success: false,
    });
  }
});

export default router;
