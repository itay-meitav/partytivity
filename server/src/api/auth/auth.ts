import express, { Request, Response } from "express";
import { changeUserStatus, searchForToken } from "src/db/users";
import jwt from "jsonwebtoken";
import authConfig from "./auth.config";
const router = express.Router();

router.get(
  "/confirm/:confirmationCode",
  async (req: Request, res: Response) => {
    const confirmationCode = { confirmationCode: req.params.confirmationCode };
    await searchForToken(confirmationCode).then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found" });
      }
      jwt.verify(
        confirmationCode.confirmationCode,
        authConfig.secret,
        async (err) => {
          if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
          }
          await changeUserStatus(user.username).then(() => {
            return res
              .status(200)
              .send({ message: "User is now active" })
              .redirect("/dashboard");
          });
        }
      );
    });
  }
);

export default router;
