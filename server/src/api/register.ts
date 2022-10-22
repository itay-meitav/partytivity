import express from "express";
import { addUser, checkIfUserExist, checkUserEmail } from "../db/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "./auth/auth.config";
import { sendConfirmationEmail } from "./auth/nodemailer.config";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, email, name } = req.body;
  const checkUsername = await checkIfUserExist(username);
  const checkEmail = await checkUserEmail(email);
  if (!checkUsername && !checkEmail) {
    if (username && password && email) {
      try {
        const token = jwt.sign({ email: email }, authConfig.secret, {
          expiresIn: "10m",
        });
        const hashedPassword = await bcrypt.hash(password, 12);
        await addUser({
          username: username,
          password: hashedPassword,
          email: email,
          name: name,
        });
        await sendConfirmationEmail(email, token);
        return res
          .cookie(
            "verify",
            jwt.sign({ name: name }, authConfig.secret, {
              expiresIn: "10m",
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 10),
              httpOnly: true,
              sameSite: "none",
              secure: true,
            }
          )
          .json({
            message:
              "User was registered successfully! Please check your email",
            success: true,
          });
      } catch (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        message: "make sure to send all the necessary fields",
        success: false,
      });
    }
  } else {
    if (checkEmail && !checkUsername) {
      return res.status(400).json({
        message: "This email already exists",
        success: false,
      });
    } else if (checkUsername && !checkEmail) {
      return res.status(400).json({
        message: "This username already exists",
        success: false,
      });
    } else {
      return res.status(400).json({
        message: "Both username and email already exist",
        success: false,
      });
    }
  }
});

export default router;
