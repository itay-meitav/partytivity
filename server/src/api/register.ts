import express, { Request, Response } from "express";
import { addUser, checkIfUserExist } from "src/db/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "./auth/auth.config";
const router = express.Router();

router.post("/", async (res: Response, req: Request) => {
  const { username, password, email } = req.body;
  const token = jwt.sign({ email: email }, authConfig.secret);
  const check = await checkIfUserExist(username);
  if (!check) {
    if (username && password && email) {
      const hashedPassword = await bcrypt.hash(password, 12);
      return await addUser({
        username: username,
        password: hashedPassword,
        email: email,
        confirmationCode: token,
      })
        .then(() => {
          return res.json({
            success: true,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({
            message: "something went wrong please try again later",
            success: false,
          });
        });
    } else {
      return res.json({
        message: "make sure to send all the necessary fields",
        success: false,
      });
    }
  } else {
    return res.json({
      message: "This user already exists",
      success: false,
    });
  }
});

export default router;
