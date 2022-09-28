import express, { Request, Response } from "express";
import { changeUserStatus, checkUserEmail } from "../../db/users";
import jwt from "jsonwebtoken";
import authConfig from "./auth.config";
const router = express.Router();

interface JWTData {
  email: string;
}

router.get("/confirm/:token", async (req: Request, res: Response) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, authConfig.secret);
  if (!decoded) return res.status(401).json({ message: "Unauthorized!" });
  await checkUserEmail({ email: (decoded as JWTData).email }).then(
    async (user) => {
      if (!user) {
        return res.status(401).json({ message: "User Not found" });
      }
      await changeUserStatus(user.username)
        .then(() => {
          return res
            .json({ message: "User is now active" })
            .redirect("/register/verified");
        })
        .catch((err) => {
          console.log(err);
          return res.status(401).json({
            message: "something went wrong please try again later",
            success: false,
          });
        });
    }
  );
});

export default router;
