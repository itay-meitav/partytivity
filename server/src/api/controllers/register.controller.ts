import { Request, Response } from "express";
import {
  addUser,
  checkIfUserExist,
  checkUserEmail,
} from "../../database/users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendConfirmationEmail } from "../config/nodemailer.config";
import envConfig from "../config/environment.config";

export const register = async (req: Request, res: Response) => {
  const { username, password, email, name, location } = req.body;
  const checkUsername = await checkIfUserExist(username);
  const checkEmail = await checkUserEmail(email);
  if (!checkUsername && !checkEmail) {
    if (username && password && email) {
      try {
        const token = jwt.sign({ email: email }, envConfig.jwt.JWT_SECRET, {
          expiresIn: "10m",
        });
        const hashedPassword = await bcryptjs.hash(password, 12);
        await addUser({
          username: username,
          password: hashedPassword,
          email: email,
          name: name,
        });
        await sendConfirmationEmail(email, token, location);
        return res
          .cookie(
            "verify",
            jwt.sign({ name: name }, envConfig.jwt.JWT_SECRET, {
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
        message: "This email is already used",
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
};
